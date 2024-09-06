module.exports = {
    apps: [
        {
            name: 'gulgonenkoop',
            args: 'start',
            script: 'node_modules/.bin/next',
            cwd: './',
            instances: 1, // Veya `max` CPU çekirdeklerine göre ayarla
            exec_mode: 'fork', // Cluster yerine fork modunu kullanabilirsiniz
            watch: false,
            env: {
                NODE_ENV: 'production'
            },
            log_file: './logs/combined.log', // Log dosyası
            out_file: './logs/out.log', // Çıktı log dosyası
            error_file: './logs/error.log', // Hata log dosyası
            interpreter: 'none' // Interpreter ayarını kaldırın
        },
    ],
};
