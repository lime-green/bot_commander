class SshHelper
  def self.exec!(ssh, command)
    stdout_data = ""
    stderr_data = ""
    exit_code = nil
    ssh.open_channel do |channel|
      channel.exec(command) do |_, success|
        unless success
          abort "FAILED: couldn't execute command (ssh.channel.exec)"
        end

        channel.on_data do |_, data|
          puts data
          stdout_data+=data
        end

        channel.on_extended_data do |_,_,data|
          puts data
          stderr_data+=data
        end

        channel.on_request("exit-status") do |_,data|
          exit_code = data.read_long
        end
      end
    end

    ssh.loop
    exit_code
  end
end
