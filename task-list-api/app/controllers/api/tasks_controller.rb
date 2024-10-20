module Api
  class TasksController < ApplicationController
    before_action :authenticate_api_request!

    def index
      if current_user
        render json: TaskSerializer.new(current_user.tasks), status: :ok
      else
        render json: { message: "Current user not found" }, status: :unauthorized
      end
    end
  end
end