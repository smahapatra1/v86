// load all files to run v86 in browser, uncompiled

(function()
{
    "use strict";

    var CORE_FILES =
        "const.js config.js log.js lib.js coverage.js cpu.js debug.js codegen.js " +
        "io.js main.js ide.js pci.js floppy.js " +
        "memory.js dma.js pit.js vga.js ps2.js pic.js rtc.js uart.js acpi.js apic.js ioapic.js hpet.js " +
        "ne2k.js state.js virtio.js bus.js elf.js";

    var BROWSER_FILES = "main.js screen.js keyboard.js mouse.js serial.js lib.js network.js starter.js worker_bus.js print_stats.js";
    var LIB_FILES = "";

    // jor1k stuff
    LIB_FILES += " jor1k.js 9p.js filesystem.js marshall.js utf8.js";

    var BUILD_FILES = "capstone-x86.min.js libwabt.js";

    var to_load = [];

    load_scripts(CORE_FILES, "src/");
    load_scripts(BROWSER_FILES, "src/browser/");
    load_scripts(LIB_FILES, "lib/");
    load_scripts(BUILD_FILES, "build/");

    function load_scripts(resp, path)
    {
        var files = resp.split(" ");

        for(var i = 0; i < files.length; i++)
        {
            if(!files[i])
            {
                continue;
            }

            to_load.push(path + files[i]);
        }
    }

    load_next();

    function load_next()
    {
        var s = to_load.shift();

        if(!s)
        {
            return;
        }

        var script = document.createElement("script");
        script.src = s;
        script.onload = load_next;
        document.head.appendChild(script);
    }
})();
