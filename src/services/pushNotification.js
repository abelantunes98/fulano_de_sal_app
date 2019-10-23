var PushNotification = require("react-native-push-notification");

PushNotification.configure({

  // Permissões necessárias para exibir as notificações.
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  // Faz a notificação ser exibida com a tela bloqueada.
  popInitialNotification: true,

  // Torna necessária o uso de notificações durante a instalação.
  requestPermissions: true
});

// Um titulo para a notificação.
// A mensagem a ser exibida.
// O tempo em segundos antes de exibir a notificação.
async function lancaNotificacao(titulo, mensagem, tempo) {
  PushNotification.localNotificationSchedule({
     
      message: mensagem, // (required)
      date: new Date(Date.now() + tempo * 1000), // in 60 secs
      priority: "high",
      title: titulo
    });
}

export {lancaNotificacao};