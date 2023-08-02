class Listener {
    constructor(PlaylistsServices, MailSender) {
      this._playlistsServices = PlaylistsServices;
      this._mailSender = MailSender;
    }
  
    listen = async (message) => {
      try {
        const { playlistId, targetEmail } = JSON.parse(
          message.content.toString(),
        );
  
        const data = await this._playlistsServices.getPlaylistSongs(
          playlistId,
        );
  
        const result = await this._mailSender.sendEmail(
          targetEmail,
          data.playlist.name,
          JSON.stringify(data),
        );
  
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };
  }
  
  module.exports = Listener;
  