module.exports = {
  apps : [{
    name: 'flutter-node',
    script: 'node',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'app.js',
    // instances: 1,
    autorestart: true,
    watch: true,
    //max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '122.152.219.175',
      ref  : 'origin/master',
      repo : 'https://github.com/lourain/flutter-node.git',
      path : '/root/fluttering/flutter-node',
      'post-deploy' : 'git pull && pm2 reload ecosystem.config.js --env production'
    }
  }
};