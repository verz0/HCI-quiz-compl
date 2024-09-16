FROM python:3.11

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /www/app/staticfiles && \
    mkdir -p /www/app/media

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE=1
WORKDIR /usr/src/app
COPY requirements.txt /usr/src/app/requirements.txt

RUN pip install --upgrade pip \
    && pip install -r /usr/src/app/requirements.txt

## entry point bash script
COPY ./entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

## start the entrypoint bash script
ENTRYPOINT ["sh", "/usr/src/app/entrypoint.sh"]
