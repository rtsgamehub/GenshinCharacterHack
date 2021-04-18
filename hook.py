import frida, sys, time, threading

# Change this to your own path.
game_dir = "D:\\games\\Genshin Impact\\Genshin Impact Game"
game_name = "GenshinImpact.exe"

# Start the process.
device = frida.get_local_device()
pid = device.spawn([game_dir + "\\" + game_name], cwd = game_dir)
session = device.attach(pid)

# Inject our script.
content = open("character.js", "r").read()
script = session.create_script(content)
script.load()

# Resume the process.
device.resume(pid)

while True:
    command = input("command: ").strip()
    if command == "":
        continue
    script.post(command)
