module Api
  class TasksController < ApplicationController
    before_action :authenticate_api_request!
    before_action :set_task, only: [:update, :destroy, :restore]

    def index
      if current_user
        tasks = current_user.tasks.order(created_at: :asc)
        render json: TaskSerializer.new(tasks), status: :ok
      else
        render json: { message: "Usuário não encontrado!" }, status: :unauthorized
      end
    end

    def create
      if current_user
        task = current_user.tasks.new(task_request_params)
        if task.save
          render json: TaskSerializer.new(task), status: :ok
        else
          render json: task.errors, status: :unprocessable_entity
        end
      else
        render json: { message: "Usuário não encontrado!" }, status: :unauthorized
      end
    end

    def update
      if @task.deleted?
        render json: { error: "Não é possível alterar uma tarefa excluída!" }, status: :unprocessable_entity
      else
        if @task.update(task_request_params)
          render json: TaskSerializer.new(@task), status: :ok
        else
          render json: @task.errors, status: :unprocessable_entity
        end
      end
    end

    def destroy
      if @task.destroy
        render json: { message: "Tarefa excluída com sucesso!" }, status: :ok
      else
        render json: { errors: "A tarefa não pode ser excluida com sucesso!" }, status: :unprocessable_entity
      end
    end

    def restore
      if @task.restore
        render json: { message: "Tarefa restaurada com sucesso!" }, status: :ok
      else
        render json: { message: "A tarefa não pode ser restaurada com sucesso!" }, status: :unprocessable_entity
      end
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