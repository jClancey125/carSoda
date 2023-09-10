#!/bin/bash

cd secondRun
source venv/bin/activate
cd frontend
nvm use 16
HOST=0.0.0.0 npm run start

