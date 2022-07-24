#!/usr/bin/env bash
cd server && go build -tags netgo -ldflags '-s -w' -o ../app .