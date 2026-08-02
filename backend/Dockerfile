FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system deps, git and node (so we can build the frontend when Render uses backend/ as context)
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    build-essential \
    gcc \
    g++ \
    ca-certificates \
    git \
    curl \
    gnupg2 \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 20 (using NodeSource) and npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm --version || true

# Copy and install Python requirements
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# If Render builds from backend/ as the service root, clone the repo and build frontend
RUN git clone --depth 1 https://github.com/SHREYA-2k5/digital-krishi-officer.git /tmp/repo \
    && if [ -d "/tmp/repo/frontend" ]; then \
         cd /tmp/repo/frontend && npm install --silent && npm run build --silent && mkdir -p /app/frontend && cp -r build /app/frontend/; \
       fi

# Copy backend source
COPY . .

EXPOSE 10000

CMD ["gunicorn", "--bind", "0.0.0.0:10000", "app:app"]