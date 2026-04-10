#!/usr/bin/env bash

SERVER_PORT=3734
EXIT_CODE=0

# Функция для поиска и завершения процессов на порту
killAppsOnPort() {
    echo "[run cypress tests]: killing apps on port $SERVER_PORT"
    
    # Для Linux (GitHub Actions)
    if command -v lsof &> /dev/null; then
        lsof -ti :$SERVER_PORT | xargs kill -9 2>/dev/null || true
    else
        # Альтернативный способ для сред без lsof
        fuser -k $SERVER_PORT/tcp 2>/dev/null || true
    fi
}

# Очистка порта перед запуском
killAppsOnPort

echo "[run cypress tests]: starting dev server"

# Запуск dev сервера в фоновом режиме
yarn start --port=$SERVER_PORT &
SERVER_PID=$!

# Функция для остановки сервера при выходе
cleanup() {
    echo "[run cypress tests]: cleaning up..."
    kill $SERVER_PID 2>/dev/null || true
    killAppsOnPort
}

# Устанавливаем обработчик выхода
trap cleanup EXIT INT TERM

# Ждем запуска сервера
echo "[run cypress tests]: waiting for dev server to start..."
MAX_RETRIES=30
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    sleep 2
    if curl -s http://localhost:$SERVER_PORT > /dev/null 2>&1; then
        echo "[run cypress tests]: dev server is running"
        break
    fi
    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo "[run cypress tests]: waiting for server... ($RETRY_COUNT/$MAX_RETRIES)"
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    echo "[run cypress tests]: ERROR - dev server failed to start"
    exit 1
fi

echo "[run cypress tests]: starting cypress tests"
APP_URL=http://localhost:$SERVER_PORT yarn run cy:run
EXIT_CODE=$?

echo "[run cypress tests]: tests completed with exit code: $EXIT_CODE"

# cleanup будет вызван автоматически через trap
exit $EXIT_CODE