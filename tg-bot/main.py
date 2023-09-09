import telebot
from telebot import types
import os
import json
from django.http import JsonResponse
import requests
###
url = 'http://localhost:5080/teams'
data = {
    "fullName" : "Брайко Иван Сергеевич",
    "telegram" : "Hacke228",
    "email" : '',
    "phoneNumber" : '',
    "password" : "VeryUnwe8j",
    "passwordConfirm" : "VeryUnwe8j"
}
try:
    # Выполняем POST-запрос с данными
    response = requests.post(url, json=data)

    # Проверяем, был ли запрос успешным (код ответа 200)
    if response.status_code == 200:
        print("Запрос успешно выполнен.")
    else:
        print(f"Ошибка выполнения запроса. Код ответа: {response.status_code}")
except requests.exceptions.RequestException as e:
    print(f"Произошла ошибка при выполнении запроса: {e}")



url = 'http://localhost:5080/teams'
#api бота
bot = telebot.TeleBot('6670372110:AAGW-7OX7RBl3b6KYwR_10q6BTxK6x3z2zw')

#пока что json
file_path = 'users.json'
if os.path.isfile(file_path) and os.path.getsize(file_path) > 0:
    with open(file_path, 'r') as file:
        data = json.load(file)
else:
    data = {}

#записываем в словарь их id
hash_table = {}
for key, value in data.items():
    hash_table[int(key)] = value

#id admin, нужно вставить свой
id_admin = 641909711

#приветствие
@bot.message_handler(commands=['start'])
def start(message):



    # Попытка открыть файл на чтение


    mes = f"""Здравствуйте, <b>{message.from_user.first_name} {message.from_user.last_name}</b>! Добро пожаловать в тг бот хакатон клуба ДИМА!\n
    """
    bot.send_message(message.chat.id, mes, parse_mode='html')


    if not message.chat.id in hash_table.keys():
        hash_table[message.chat.id] = message.from_user.username
        with open('users.json', 'w') as file:
            json.dump(hash_table, file)

    mes = """Функции тг бота:
    1)
    ...
    n)"""
    bot.send_message(message.chat.id, mes, parse_mode='html')
    #подключение json
    file_name = f"{message.chat.id}.json"
    try:
        with open(file_name, 'r') as file:
            data_chat_id = json.load(file)
            if data_chat_id['first_name'] == '':
                mes = f"""Вы не зарегестрированный пользователь, пройдите регистрацию с помощью /reg
                    """
                bot.send_message(message.chat.id, mes, parse_mode='html')
    except FileNotFoundError:
        mes = f"""Вы не зарегестрированный пользователь, пройдите регистрацию с помощью /reg
            """
        bot.send_message(message.chat.id, mes, parse_mode='html')
        # Если файл не найден, создаем пустой словарь
        data_chat_id = {
        "first_name": "",
        "last_name": "",
        "last_last_name": "",
        "tg": "",
        "phone": "",
        "specialnost": "",
        "command": "",
        "stash": 0,
        'group': '',
        'team': '-',
        'reg': 'off',
        'invite': ''
}
        with open(file_name, 'w') as file:
            json.dump(data_chat_id, file, indent=4)

#регистерация пользователя
@bot.message_handler(commands=['reg'])
def last_name(message):
    file_name = f"{message.chat.id}.json"
    with open(file_name, 'r') as file:
        data_chat_id = json.load(file)
    print(data_chat_id)
    ### проверить защиту от повторной регистрации  у Вани
    if data_chat_id['reg'] == 'off':
        mes = f"""Ваша фамилия:"""
        bot.send_message(message.chat.id, mes, parse_mode='html')
        bot.register_next_step_handler(message, first_name)
    else:
        mes = f"""Вы зарегистрированный пользователь, проверьте свои данные /info:"""
        bot.send_message(message.chat.id, mes, parse_mode='html')



def first_name(message):

    file_name = f"{message.chat.id}.json"
    with open(file_name, 'r') as file:
        data_chat_id = json.load(file)
    data_chat_id["last_name"] = message.text
    with open(file_name, 'w') as file:
        json.dump(data_chat_id, file, indent=4)

    mes = f"""Ваше имя:"""

    bot.send_message(message.chat.id, mes, parse_mode='html')
    bot.register_next_step_handler(message, last_last_name)
def last_last_name(message):
    file_name = f"{message.chat.id}.json"
    with open(file_name, 'r') as file:
        data_chat_id = json.load(file)
    data_chat_id["first_name"] = message.text
    with open(file_name, 'w') as file:
        json.dump(data_chat_id, file, indent=4)
    mes = f"""Ваше отчество:"""
    bot.send_message(message.chat.id, mes, parse_mode='html')
    bot.register_next_step_handler(message, group)
def group(message):
    file_name = f"{message.chat.id}.json"
    with open(file_name, 'r') as file:
        data_chat_id = json.load(file)
    data_chat_id["last_last_name"] = message.text
    with open(file_name, 'w') as file:
        json.dump(data_chat_id, file, indent=4)
    mes = f"""Ваша группа:"""
    bot.send_message(message.chat.id, mes, parse_mode='html')
    bot.register_next_step_handler(message, specialnost)
def specialnost(message):
    file_name = f"{message.chat.id}.json"
    with open(file_name, 'r') as file:
        data_chat_id = json.load(file)
    data_chat_id["group"] = message.text
    with open(file_name, 'w') as file:
        json.dump(data_chat_id, file, indent=4)
    mes = f"""Ваша специальность (backend, frontend и т.д.):"""
    bot.send_message(message.chat.id, mes, parse_mode='html')
    bot.register_next_step_handler(message, phone)
def phone(message):
    file_name = f"{message.chat.id}.json"
    with open(file_name, 'r') as file:
        data_chat_id = json.load(file)
    data_chat_id["specialnost"] = message.text
    with open(file_name, 'w') as file:
        json.dump(data_chat_id, file, indent=4)
    mes = f"""Ваш номер телфона(если не хотите указывать, то напечатайте "-":"""
    bot.send_message(message.chat.id, mes, parse_mode='html')
    bot.register_next_step_handler(message, tg)
def tg(message):
    file_name = f"{message.chat.id}.json"
    with open(file_name, 'r') as file:
        data_chat_id = json.load(file)
    data_chat_id['phone'] = message.text
    data_chat_id["tg"] = message.from_user.username
    data_chat_id["reg"] = 'on'
    print(data_chat_id)
    mes = f"""Регистрация успешно завершена!
Ваши данные:
\tФамилия: {data_chat_id["last_name"]}
\tИмя: {data_chat_id["first_name"]}
\tОтчество: {data_chat_id["last_last_name"]}
\tКоманда хакатона: {data_chat_id['team']}
\tАкадемическая группа: {data_chat_id["group"]}
\tСпециальность: {data_chat_id["specialnost"]}
\tТелефон: {data_chat_id['phone']}
\tТГ: @{data_chat_id["tg"]}"""
    with open(file_name, 'w') as file:
        json.dump(data_chat_id, file, indent=4)
    bot.send_message(message.chat.id, mes, parse_mode='html')


#список хаков
@bot.message_handler(commands=['list'])
def list(message):
    mes = f"""Список ближайших хакатонов"""
    bot.send_message(message.chat.id, mes, parse_mode='html')

#регистрация хака
@bot.message_handler(commands=['register'])
def register(message):
    mes = f"""  """
    bot.send_message(message.chat.id, mes, parse_mode='html')

@bot.message_handler(commands=['team'])
def team(message):
    file_name = f"{message.chat.id}.json"
    with open(file_name, 'r') as file:
        data_chat_id = json.load(file)
    mes = f"""Название команды: \t{ data_chat_id['team']}\n
Участники вашей команды /my_team\n
Создать команду, <b>/create_team</b> <i>'Название команды'</i>\n
Пригласить в команду <b>/invite_team</b> \n
"""
###Запрос на участвие уже созданной команды <b>/team_request</b> <i>'Название команды'</i>\n
###Режим "ОДИНОЧКА" Включить <b>/i_am_team_on</b> , Выключить <b>/i_am_team_off</b>
    bot.send_message(message.chat.id, mes, parse_mode='html')
@bot.message_handler(commands=['info'])
def info(message):
    file_name = f"{message.chat.id}.json"
    with open(file_name, 'r') as file:
        data_chat_id = json.load(file)
    mes = f"""Ваши данные:
    \tФамилия: {data_chat_id["last_name"]}
    \tИмя: {data_chat_id["first_name"]}
    \tОтчество: {data_chat_id["last_last_name"]}
    \tКоманда хакатона: {data_chat_id['team']}
    \tАкадемическая группа: {data_chat_id["group"]}
    \tСпециальность: {data_chat_id["specialnost"]}
    \tТелефон: {data_chat_id['phone']}
    \tТГ: @{data_chat_id["tg"]}
    Изменить свои данные: /info_change 'причина'"""
    bot.send_message(message.chat.id, mes, parse_mode='html')
@bot.message_handler(commands=['info_change'])
def info_change(message):
    bot.register_next_step_handler(message, last_name)
@bot.message_handler(commands=['create_team'])
def create_team(message):
    file_name_2 = f"{message.chat.id}.json"
    with open(file_name_2, 'r') as file:
        data_chat_id = json.load(file)
    if data_chat_id['team'] != '-':
        mes = """Вы уже в команде"""
        bot.send_message(message.chat.id, mes, parse_mode='html')
        return
    #подключение json
    words = message.text.split()
    if len(words)<2:
        mes = 'Вы не ввели название команды'
        bot.send_message(message.chat.id, mes, parse_mode='html')
        return
    words.pop(0)
    part = ' '.join(words)
    file_name = f"{part}.json"
    # Указываем путь к папке, в которой нужно выполнить проверку
    folder_path = "C:\\Users\\alast\\PycharmProjects\\hack_07-11"

    # Получаем список файлов в указанной папке
    files_in_folder = os.listdir(folder_path)

    # Проверяем, отсутствует ли JSON-файл с заданным именем
    if file_name in files_in_folder:
        mes = 'Такая команда есть'
        bot.send_message(message.chat.id, mes, parse_mode='html')
        return
    try:
        with open(file_name, 'r') as file:
            team_chat_id = json.load(file)
            if team_chat_id[message.from_user.username] != message.chat.id:
                mes = f"""Команда с таким названием уже создана. Выберете другое название 
                    """
                bot.send_message(message.chat.id, mes, parse_mode='html')
            else:
                mes = f"""Вы являетесь владельцем команды или она уже создана 
                    """
                bot.send_message(message.chat.id, mes, parse_mode='html')
    except FileNotFoundError:
        mes = f"""Команда создана! Теперь нужно пригласить сокомандников /invite_team
            """
        bot.send_message(message.chat.id, mes, parse_mode='html')
        # Записываем главного перца в команду
        team_chat_id = {
        message.from_user.username: message.chat.id
        }
        file_name_2 =f"{message.chat.id}.json"
        with open(file_name_2, 'r') as file:
            data_chat_id = json.load(file)
        data_chat_id['team'] = part
        data_chat_id['invite'] = part
        with open(file_name_2, 'w') as file:
            json.dump(data_chat_id, file, indent=4)
        with open(file_name, 'w') as file:
            json.dump(team_chat_id, file, indent=4)
@bot.message_handler(commands=['invite_team'])
def invite_team(message):
    mes ="""Теперь можете пригласить участника в команду.
    Пример:
    \t@QWE
    """
    bot.send_message(message.chat.id, mes, parse_mode='html')
    bot.register_next_step_handler(message, invite)
def invite(message):

    file_name = f"{message.chat.id}.json"
    with open(file_name, 'r') as file:
        data_chat_id = json.load(file)

    file_name = f"{data_chat_id['team']}.json"
    with open(file_name, 'r') as file:
        team_chat_id = json.load(file)
    if len(team_chat_id) < 5:
        check = False
        key_id = 0
        text_id = message.text[1:]
        for key, value in hash_table.items():
            if value == text_id:
                check = True
                key_id = key
                break

        if not check:
            mes =f"""{message.text} такого участника нет,"""
            bot.send_message(message.chat.id, mes, parse_mode='html')
        else:
            mes = f"""Сообщение отправлено: {message.text}"""
            bot.send_message(message.chat.id, mes, parse_mode='html')
            file_name = f"{key_id}.json"
            with open(file_name, 'r') as file:
                data2_id = json.load(file)
            data2_id['invite'] = data_chat_id['team']
            with open(file_name, 'w') as file:
                json.dump(data2_id, file, indent=4)
            mes =f"""Вам пришло приглашение в команду от <b>{message.from_user.username}</b>. Принять /accept , отклонить /deny."""
            bot.send_message(key_id, mes, parse_mode='html')
    else:
        mes = """В вашей команде уже 5 участников"""
        bot.send_message(message.chat.id, mes, parse_mode='html')
@bot.message_handler(commands=['accept'])
def accept(message):
    file_name = f"{message.chat.id}.json"
    with open(file_name, 'r') as file:
        data_id = json.load(file)
    if data_id['invite'] != '':
        data_id['team'] = data_id['invite']
        file_path = f"{data_id['team']}.json"
        with open(file_path, 'r') as file:
            data2_id = json.load(file)

        mes = f"""Добавлен в команду {message.from_user.username}"""
        for key in data2_id.values():
            bot.send_message(key, mes, parse_mode='html')
        with open(file_name, 'w') as file:
            json.dump(data_id, file, indent=4)

        data2_id[message.from_user.username] = message.chat.id
        with open(file_path, 'w') as file:
            json.dump(data2_id, file, indent=4)

        mes = f"""Вы добавлены в команду"""
        bot.send_message(message.chat.id, mes, parse_mode='html')
    else:
        mes = f"""Приглашения нет в команду"""
        bot.send_message(message.chat.id, mes, parse_mode='html')
@bot.message_handler(commands=['deny'])
def accept(message):
    file_name = f"{message.chat.id}.json"
    with open(file_name, 'r') as file:
        data_id = json.load(file)
    if data_id['invite'] != '':
        file_path = f"{data_id['invite']}.json"
        data_id['invite'] = ''
        with open(file_path, 'r') as file:
            data2_id = json.load(file)

        mes = f"""Отклонил приглашение {message.from_user.username}"""
        print(data2_id.values())
        for key in data2_id.values():
            bot.send_message(key, mes, parse_mode='html')
        with open(file_name, 'w') as file:
            json.dump(data_id, file, indent=4)
    else:
        mes = f"""Приглашения нет в команду"""
        bot.send_message(message.chat.id, mes, parse_mode='html')

@bot.message_handler(commands=['reg_hack'])
def reg_hack(message):
    file_path = "hack.json"
    words = message.text.split()
    if len(words) < 2:
        mes = 'Вы не ввели название команды'
        bot.send_message(message.chat.id, mes, parse_mode='html')
        return
    words.pop(0)
    part = ' '.join(words)
    data = {}
    data[part] = part
    with open(file_path, "w") as json_file:
        json.dump(data, json_file, indent=4)


bot.polling(none_stop=True)

