module Api
  class TasksController < ApplicationController
    before_action :authenticate_api_request!
    before_action :set_task, only: [:update, :destroy, :restore]

    def index
      tasks = current_user.tasks.order(created_at: :asc)
      render json: TaskSerializer.new(tasks), status: :ok
    end

    def create
      task = current_user.tasks.new(task_request_params)
      unless task.save
        return render json: task.errors, status: :unprocessable_entity
      end 

      render json: TaskSerializer.new(task), status: :ok
    end

    def update
      if @task.deleted?
        return render json: { error: "Não é possível alterar uma tarefa excluída!" }, status: :unprocessable_entity
      end

      unless @task.update(task_request_params)
        return render json: @task.errors, status: :unprocessable_entity
      end

      render json: TaskSerializer.new(@task), status: :ok
    end

    def destroy
      unless @task.destroy
        return render json: { errors: "A tarefa não pode ser excluida com sucesso!" }, status: :unprocessable_entity
      end

      render json: { message: "Tarefa excluída" }, status: :ok
    end

    def restore
      unless @task.restore
        return render json: { message: "A tarefa não pode ser restaurada com sucesso!" }, status: :unprocessable_entity        
      end

      render json: { message: "Tarefa restaurada com sucesso!" }, status: :ok
    end

    private

    def set_task
      @task = current_user.tasks.with_deleted.find_by(id: params[:id])
      return render json: { error: "Tarefa não encontrada!" }, status: :not_found unless @task
    end

    def task_request_params
      params.require(:task).permit(:description, :is_checked)
    end
  end
end