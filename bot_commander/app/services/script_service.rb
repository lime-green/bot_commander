class ScriptService
  def self.run(host, script_name, dreambot_username, rs_username)
    server = Server.find_by!(ip: host)
    script = Script.find_by!(name: script_name)
    dreambot_user = DreambotAccount.find_by!(username: dreambot_username)
    rs_user = RsAccount.find_by!(username: rs_username)

    Net::SSH.start(host, 'root') do |ssh|
      ret = SshHelper.exec!(ssh, script(dreambot_user.username, dreambot_user.password, rs_user.username, rs_user.password, script_name))
      if ret == 0
        if rs_user.ready?
          rs_user.mark_running!
        else
          rs_user.do_tutorial!
        end

        rs_user.server = server
        rs_user.save!
      end
    end
  end

  private

  def self.script(dreambot_username, dreambot_password, rs_username, rs_password, script_name)
    <<-EOF
      export DISPLAY=localhost:1 && \
      cd ~/DreamBot/BotData && \
      (nohup java -Xmx#{Script.get_ram}M -jar client.jar -username #{dreambot_username} -password #{dreambot_password} \
        -world 301 \
        -script #{script_name} \
        -fps 15 \
        -params #{rs_username} #{rs_password} >log.out 2>log.out < /dev/null &) && \
      exit
    EOF
  end
end
