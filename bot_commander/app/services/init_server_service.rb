class InitServerService
  def self.init(server)
    raise "Needs to be in proper state" unless server.spawned?

    Net::SSH.start(server.ip, 'root', timeout: 5) do |ssh|
      server.mark_initializing!

      ret = SshHelper.exec!(ssh, script)
      if ret == 0
        server.mark_ready!
      else
        server.mark_spawned!
        raise "Script failed to initialize the server. Unknown error occurred"
      end
    end

  rescue StandardError => e
    server.mark_spawned! if server.initializing?
    raise e
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
