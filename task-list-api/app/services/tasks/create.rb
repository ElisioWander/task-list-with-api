module Tasks
  class Create
      def initialize(user, params)
        @user = user
        @params = params
      end

      def call
        task = @user.tasks.new(@params)
        return OpenStruct.new(success?: false, errors: task.errors) unless task.save
      
        OpenStruct.new(success?: true, task: task)
      end
  end
end