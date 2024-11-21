class TasksCleanupJob < ApplicationJob
  queue_as :default

  def perform
    Task.only_deleted.where('deleted_at < ?', Time.current).delete_all
  end
end
