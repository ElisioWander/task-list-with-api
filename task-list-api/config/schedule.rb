set :output, {:error => 'error.log', :standard => 'cron.log'}

every 1.day, at: '00:00' do
  runner "TasksCleanupJob.perform_now", :output => 'cron.log'
end


