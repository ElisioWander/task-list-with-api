module Api
  class TasksController < ApplicationController
    before_action :authenticate_api_request!
    before_action :set_task, only: [:update, :destroy]

    def index
      if current_user
        render json: TaskSerializer.new(current_user.tasks), status: :ok
      else
        render json: { message: "Current user not found" }, status: :unauthorized
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
        render json: { message: "Current user not found" }, status: :unauthorized
      end
    end

    def update
      if @task.update(task_request_params)
        render json: TaskSerializer.new(@task), status: :ok
      else
        render json: @task.errors, status: :unprocessable_entity
      end
    end

    def destroy
      if @task.destroy
        render json: { message: "Task deleted successfully" }, status: :ok
      else
        render json: { errors: "Task could not be deleted" }, status: :unprocessable_entity
      end
    end

    private

    def set_task
      @task = current_user.tasks.find_by(id: params[:id])
      render json: { error: "Task not found!" }, status: :not_found unless @task
    end

    def task_request_params
      params.require(:task).permit(:description, :is_checked)
    end
  end
end