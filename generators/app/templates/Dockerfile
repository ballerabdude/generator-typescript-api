From ubuntu:14.04
MAINTAINER Abdul Hagi <abdul.hagi@turner.com>

# update base image
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y \
      build-essential curl python git-core libkrb5-dev

# Install node
RUN curl -O https://nodejs.org/dist/v4.2.1/node-v4.2.1.tar.gz && tar zxvf node-v4.2.1.tar.gz
RUN cd node-v4.2.1 && ./configure && make && make install
RUN cd ../ && rm -rf node-v4.2.1

# Add our applicaiton source
RUN mkdir -p /opt/<%= appName %>
WORKDIR /opt/<%= appName %>

# Install Dependencies
RUN npm install -g pm2 tsd typescript gulp

ADD ./package.json package.json
ADD ./tsd.json tsd.json
ADD ./gulpfile.js gulpfile.js

ADD src src
#Install TypeScript Definition Files
RUN tsd install
#Install NPM Packages
RUN npm install
#Build Project
RUN gulp ts

EXPOSE 8000
# Clean up apt when done
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

CMD ["pm2", "--no-daemon", "start", "build/app.js", "-i", "0", "--name", "scosac-api"]
