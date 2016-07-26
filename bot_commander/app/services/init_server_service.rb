class InitServerService
  def self.init(host)
    Net::SSH.start(host, 'root') do |ssh|
      ret = SshHelper.exec!(ssh, script)

      if ret == 0
        server = Server.find_by!(ip: host)
        server.mark_ready!
      end
    end

  rescue Net::SSH::AuthenticationFailed
    return -1
  end

  private

  def self.script
    <<-HEREDOC
      sudo apt-get -y update && \
      sudo apt-get -y install openjdk-8-jdk xorg tightvncserver && \
      mkdir -p ~/DreamBot/BotData && \
      mkdir -p ~/DreamBot/Scripts && \
      cd ~/DreamBot/BotData && \
      echo "a" > account && \
      wget -O client.jar "http://cdn.dreambot.org/download/dreambot-latest.jar" && \
      { echo password; echo password; echo n ; } | vncserver && \
      exit
    HEREDOC
  end
end
