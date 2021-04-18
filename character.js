let index = 0;
const characters = [
    // Ganyu
    0x9896a5,
    0xe75,
    // Hutao
    0x9896ae,
    0x11f9,
    // Keqing
    0x9896aa,
    0x1069,
    // Mono
    0x9896a9,
    0x1005,
    // Jean
    0x989683,
    0x12d,
    // Zhongli
    0x98969e,
    0xbb9,
    // Xiao
    0x98969a,
    0xa29,
    // Abeldo
    0x9896a6,
    0xed9,
    // Child
    0x9896a1,
    0xce5,
    // Klee
    0x98969d,
    0xb55,
    // Wendy
    0x989696,
    0x899,
    // Qiqi
    0x9896a3,
    0xdad,
    // Diluc
    0x989690,
    0x641,
];

function start() {
    const unity = Process.findModuleByName('UserAssembly.dll');
    if (!unity) {
        console.error('Cannot find UserAssembly.dll.');
        return;
    }

    Interceptor.attach(unity.base.add(0x16d16e0), {
        onEnter(args) {
            // Replace Lumin with the selcted character.
            if (args[1].equals(0x989687)) {
                args[1] = ptr(characters[index * 2 % characters.length]);
            }
        }
    });

    Interceptor.attach(unity.base.add(0x17f1e20), {
        onEnter(args) {
            // Replace Lumin's skill with the selected character's skill.
            if (args[1].equals(0x2c0)) {
                args[1] = ptr(characters[index * 2 % characters.length + 1]);
            }
        }
    });

    Interceptor.attach(unity.base.add(0x2830b80), {
        onLeave(value) {
            // CanUseSkill = true
            value.replace(ptr(1));
        }
    });
}

function onMessage(command) {
    switch (command) {
        case 'start':
            start();
            break;
        case 'next':
            index++;
            break;
        default:
            console.error('Unknown command: ' + command);
            break;
    }
    recv(onMessage);
}

recv(onMessage);
