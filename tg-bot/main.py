import telebot
from telebot import types
import os
import json
from django.http import JsonResponse
import requests
import re
###





bot = telebot.TeleBot('6670372110:AAGW-7OX7RBl3b6KYwR_10q6BTxK6x3z2zw')

id_admin = 641909711

#приветствие
@bot.message_handler(commands=['start'])
def start(message):
    mes = f"""Здравствуйте, {message.from_user.username}
Функции тг бота:
\t/register - зарегистрироваться в системе
\t/team"""
    bot.send_message(message.chat.id, mes, parse_mode='html')

@bot.message_handler(commands=['register'])
def reg(message):
    global data_r
    global url
    url = 'http://localhost:5080/register'
    data_r = {
        "fullName": "",
        "telegram": "",
        "email": "",
        "phoneNumber": "",
        "password": "",
        "passwordConfirm": ""
    }
    mes = f"""ФИО:"""
    bot.send_message(message.chat.id, mes, parse_mode='html')
    bot.register_next_step_handler(message, reg1)
def reg1(message):
    data_r["fullName"] = message.text
    mes = f"""Telegram(username):"""
    bot.send_message(message.chat.id, mes, parse_mode='html')
    bot.register_next_step_handler(message, reg2)
def reg2(message):
    data_r["telegram"] = '@'+message.from_user.username
    mes = f"""Email:"""
    bot.send_message(message.chat.id, mes, parse_mode='html')
    bot.register_next_step_handler(message, reg3)
def reg3(message):
    data_r["email"] = message.text
    mes = f"""Номер телефона:"""
    bot.send_message(message.chat.id, mes, parse_mode='html')
    bot.register_next_step_handler(message, reg4)
def reg4(message):
    data_r["phoneNumber"] = message.text
    mes = f"""Пароль(хотя бы один символ A-Z):"""
    bot.send_message(message.chat.id, mes, parse_mode='html')
    bot.register_next_step_handler(message, reg5)
def reg5(message):
    data_r["password"] = message.text
    mes = f"""Подтверждение пароля:"""
    bot.send_message(message.chat.id, mes, parse_mode='html')
    bot.register_next_step_handler(message, reg6)
def reg6(message):
    if message.text != data_r["password"]:
        mes = f"""Пароли не совпадают:"""
        bot.send_message(message.chat.id, mes, parse_mode='html')
        bot.register_next_step_handler(message, reg4)
        return
    data_r["passwordConfirm"] = message.text
    url = 'http://localhost:5080/register'
    response = requests.post(url, json=data_r)

    # Проверяем, был ли запрос успешным (код ответа 200)
    if response.status_code == 200:
        mes = f"""Регистрация пройдена успешна!"""
        bot.send_message(message.chat.id, mes, parse_mode='html')
    else:
        mes = f"""Вы уже зарегестрировались."""
        bot.send_message(message.chat.id, mes, parse_mode='html')

@bot.message_handler(commands=['create_team'])
def create_team(message):
    global data_c_t
    global url
    url = 'http://localhost:5080/register'
    data_c_t = {
  "name": "",
  "leaderUserName": "",
  "memberUserNames": [
  ]
}
    mes = f"""Название команды"""
    bot.send_message(message.chat.id, mes, parse_mode='html')
    bot.register_next_step_handler(message, create_team_name)
def create_team_name(message):
    data_c_t["name"] = message.text
    mes = f"""Добавьте сокомадников по очереди, максимальное количество в команде 5 человек. Если число сокомадников меньше 5, то напиши /stop в конце.
Пример:
\t@Name1
\t@Name2
\t/stop"""
    data_c_t["leaderUserName"] = message.from_user.username
    bot.send_message(message.chat.id, mes, parse_mode='html')
    bot.register_next_step_handler(message, create_team_member1)


def create_team_member1(message):
    if message.text == '/stop':
        response = requests.post(url, json=data_c_t)

        # Проверяем, был ли запрос успешным (код ответа 200)
        if response.status_code == 200:
            mes = f"""Команда создана! 1 участник из 5."""
            bot.send_message(message.chat.id, mes, parse_mode='html')
            return
        else:
            mes = f"""Такая команда уже есть."""
            bot.send_message(message.chat.id, mes, parse_mode='html')
            return
    data_c_t["memberUserNames"].append(message.from_user.username)
    mes = 'Вы добавили первого сокомадника.'
    bot.send_message(message.chat.id, mes, parse_mode='html')

    bot.register_next_step_handler(message, create_team_member2)
def create_team_member2(message):
    if message.text == '/stop':
        response = requests.post(url, json=data_c_t)

        # Проверяем, был ли запрос успешным (код ответа 200)
        if response.status_code == 200:
            mes = f"""Команда создана! 2 участник из 5."""
            bot.send_message(message.chat.id, mes, parse_mode='html')
            return
        else:
            mes = f"""Такая команда уже есть."""
            bot.send_message(message.chat.id, mes, parse_mode='html')
            return
    data_c_t["memberUserNames"].append(message.from_user.username)
    mes = 'Вы добавили второго сокомадника.'
    bot.send_message(message.chat.id, mes, parse_mode='html')

    bot.register_next_step_handler(message, create_team_member3)
def create_team_member3(message):
    if message.text == '/stop':
        response = requests.post(url, json=data_c_t)

        # Проверяем, был ли запрос успешным (код ответа 200)
        if response.status_code == 200:
            mes = f"""Команда создана! 3 участник из 5."""
            bot.send_message(message.chat.id, mes, parse_mode='html')
            return
        else:
            mes = f"""Такая команда уже есть."""
            bot.send_message(message.chat.id, mes, parse_mode='html')
            return
    data_c_t["memberUserNames"].append(message.from_user.username)
    mes = 'Вы добавили третьего сокомадника.'
    bot.send_message(message.chat.id, mes, parse_mode='html')

    bot.register_next_step_handler(message, create_team_member4)

def create_team_member4(message):
    if message.text == '/stop':
        response = requests.post(url, json=data_c_t)

        # Проверяем, был ли запрос успешным (код ответа 200)
        if response.status_code == 200:
            mes = f"""Команда создана! 4 участник из 5."""
            bot.send_message(message.chat.id, mes, parse_mode='html')
            return
        else:
            mes = f"""Такая команда уже есть."""
            bot.send_message(message.chat.id, mes, parse_mode='html')
            return
    data_c_t["memberUserNames"].append(message.from_user.username)
    response = requests.post(url, json=data_c_t)
    if response.status_code == 200:
        mes = 'Вы добавили четвертого сокомадника. В команде теперь 5 участников.'
        bot.send_message(message.chat.id, mes, parse_mode='html')
        return
    else:
        mes = f"""Такая команда уже есть."""
        bot.send_message(message.chat.id, mes, parse_mode='html')
        return

bot.polling(none_stop=True)

