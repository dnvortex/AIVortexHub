#!/bin/bash
set -e

# Install dependencies
npm install

# Push database schema changes
npm run db:push
