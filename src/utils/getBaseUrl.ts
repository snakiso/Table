export function getBaseUrl() {
    const protocol = window.location.protocol; // Протокол (например, "https:")
    const hostname = window.location.hostname; // Хостнейм (например, "perm.url.ru")
    const port = window.location.port; // Порт (если указан в URL)

    // Собираем базовый URL
    let baseUrl = protocol + '//' + hostname;

    // Добавляем порт, если он указан
    if (port) {
        baseUrl += ':' + port;
    }

    return baseUrl;
}