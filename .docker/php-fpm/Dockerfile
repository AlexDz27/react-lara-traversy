FROM php:8.0.1-fpm

RUN pecl install xdebug-3.0.0 && docker-php-ext-enable xdebug

RUN docker-php-ext-install pdo_mysql
