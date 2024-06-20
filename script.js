document.addEventListener('DOMContentLoaded', () => {
    const terminalOutput = document.getElementById('terminal-output');
    const userInput = document.getElementById('user-input');

    const terminalTemplate = document.getElementById('terminal-template');
    const openTerminalButtons = document.querySelectorAll('.open-terminal');

    // Function to focus on the input field
    function focusInput() {
        userInput.focus();
    }
     // Event listener to focus input on document click
     document.addEventListener('click', focusInput);

     // Event listener to focus input on any keypress
     document.addEventListener('keydown', focusInput);

    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const input = userInput.value.trim();
            userInput.value = '';

            if (input) {
                handleCommand(input);
            }
        }
    });

    function handleCommand(input) {
        const output = document.createElement('div');
        output.textContent = `$ ${input}`;
        terminalOutput.appendChild(output);
        
        inputstring = input.toLowerCase()

        if(inputstring.startsWith("sudo")){
            displayOutput("It appears you tried using sudo: \n I am sorry, but you do not have administrative privileges here :)")
            return
        }
        

        switch (inputstring) {
            case 'help':
                displayHelp();
                break;
            case 'about':
                displayAbout();
                break;
            case 'projects':
                displayProjects();
                break;
            case 'contact':
                displayContact();
                break;
            case 'ls':
                break;
            case 'cat':
                createCatTerminal();
                break;
            case '?':
                displayHelp();
            default:
                displayError(input);
                break;
        }

        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    
    function displayHelp() {
        const helpText = `
Available commands:
- help: Show this help message
- about: Display information about me
- projects: Show my projects
- contact: Show my contact information
- cat : Show a picture of a cute cat
`;
        displayOutput(helpText);
    }

    function displayAbout() {
        const abouttext = `
Name: Georgi Dimov
Online handle: dbox / dbox7 / dbox0
Location: Bremen, Germany
  
I am a computer science student interested in Computer Graphics, math, GameDev
and all things software development.

I have worked as a Unity GameDev for a startup (Chameleon GmbH) and am currently teaching myself Graphics Programming alongside pursuing my Bachelors Degree at the University of Applied Sciences Bremen.

`;

        displayOutput(abouttext);
    }

    function displayProjects() {
        const test = `
Projects:
1. <a href="https://your-portfolio-website.com/project1">Portfolio Website</a> - A terminal-style portfolio website.
2. <a href="https://your-portfolio-website.com/project2">TEST</a> - A simple Test Project.
`;

        const projectsText = `
Projects:
    1. my own 3D Rendering Engine using OpenGL (Work in Progress)
    2. A Fluid Dynamics Simulation using Smoothed Particle Hydrodynamics - written in C++ , OpenGL and OpenCL
    3. Several week-long GameJam sumbmissions.
        * Trepenfall Simulator 2022
        * Eis Planet Schlange
        * PvPinball - Exhibited at Gamescom 2023 
    `
        displayOutput(projectsText);
    }

    function displayContact() {
        const contactText = `You can reach me at: georgi.dimov96@gmail.com

LinkedIn: click here
        `;
        displayOutput(contactText);
    }

    function displayError(input) {
        const errorText = `command not found: ${input}`;
        displayOutput(errorText);
    }

    function displayOutput(input) {
        let index = 0;
        const output = document.createElement('div');
        terminalOutput.appendChild(output);

        function type() {
            if (index < input.length) {
                if (input[index] === '<') {
                    const end = input.indexOf('>', index);

                    if (end !== -1) {
                        output.innerHTML += input.slice(index, end + 1);
                        index = end + 1;
                    } else {
                        output.textContent += input[index];
                        index++;
                    }
                } else {
                    output.textContent += input[index];
                    index++;
                }
                setTimeout(type, 1);  
            }
        }

        type();
    }

    
    displayOutput('Welcome to my portfolio. Type "help" to see available commands.');





    openTerminalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonId = this.id; 
            console.log(buttonId)
            createDraggableTerminal(buttonId);
        });
    });

    




    function createDraggableTerminal(buttonIdOrContent) {
        console.log("createWindow ID " + buttonIdOrContent)
        let content = '';
        switch (buttonIdOrContent) {
            case 'about-btn':
                content = '<p>I am a computer science student.</p><p>Interested in programming and realtime rendering.</p><p>Fluent in C#, Java, Python and good at some other languages</p>';
                break;
            case 'proj-btn':
                content = `
                    <p>Projects:</p>
                    <ul>
                        <li><a href="https://solocov.itch.io/eis-planet-schlange" target="_blank">Eis Planet Schlange</a> - 7 day GameJam submission 2022</li>
                        <li><a href="https://dbox7.itch.io/treppenfall-simulator-2022" target="_blank">Treppenfall Simulator 2022</a> - 7 day GameJam submission 2022 </li>
                        <li><a href="https://supertobi1.itch.io/pvpinball" target="_blank">PvPinball</a> - 7 day GameJam submission 2023. Exhibited at Gamescom 2023 </li>
                    </ul>
                    <p>Coming Soon:</p>
                    <ul>
                    <li>Fluid Simulation using SPH</li>
                    </ul>
                    <p>Coming not so soon:</p>
                    <ul><li>My own Realtime Rendering Engine </li></ul>
                `;
                break;
            case 'contact-btn':
                content = `<p>You can reach me at: georgi.dimov96@gmail.com</p>
                <p>LinkedIn:</p><a href="https://www.linkedin.com/in/georgi-dimov-8160a9211/" target="_blank"> link</a>`;
                break;
            default:
                content = buttonIdOrContent;
        }

        const clone = terminalTemplate.content.cloneNode(true);
        const terminal = clone.querySelector('.draggable-terminal');
        const closeButton = terminal.querySelector('.close-terminal');
        const titleBar = terminal.querySelector('.draggable-title');
        const contentArea = terminal.querySelector('.draggable-content');

        contentArea.innerHTML = content;

        // Random Offset

        const offsetX = Math.floor(Math.random() * 50) - 50; 
        const offsetY = Math.floor(Math.random() * 50) - 25; 


        terminal.style.left = `calc(50% + ${offsetX}px)`;
        terminal.style.top = `calc(50% + ${offsetY}px)`;


        document.body.appendChild(clone);


        makeDraggable(terminal, titleBar);
        closeButton.addEventListener('click', () => {
            terminal.remove();
        });
    }

    function createCatTerminal() {
        const timestamp = new Date().getTime(); // Generate a unique timestamp
        const catContent = `<img src="https://cataas.com/cat?timestamp=${timestamp}" alt="A cute cat">`;
        const terminal = createDraggableTerminal(catContent);
    }


    function makeDraggable(terminal, titleBar) {
        let offsetX = 0, offsetY = 0, isDragging = false;

        titleBar.addEventListener('mousedown', (event) => {
            isDragging = true;
            offsetX = event.clientX - terminal.offsetLeft;
            offsetY = event.clientY - terminal.offsetTop;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        function onMouseMove(event) {
            if (isDragging) {
                terminal.style.left = `${event.clientX - offsetX}px`;
                terminal.style.top = `${event.clientY - offsetY}px`;
            }
        }

        function onMouseUp() {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }
});