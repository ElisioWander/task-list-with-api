module Api
  class TasksController < ApplicationController
    before_action :authenticate_api_request!

    def index
        print ">>>>>>>>>>>>>>>#{current_user.tasks}<<<<<<<<<<<"
    end
  end
end