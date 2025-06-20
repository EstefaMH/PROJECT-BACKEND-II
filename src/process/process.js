import { Command } from 'commander';

const program = new Command();

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Puerto del servidor', 9090)
    .option('--mode <mode>', 'Modo de trabajo', 'develop')
    .option('--persist <mode>, "modo de persistencia', "mongo")
  //  .requiredOption('-u <user>', 'Usuario que se va a utilizar el aplicativo', 'No se ha declarado un usuario')

program.parse()

console.log("Option: ", program.opts())
console.log("Mode options: ", program.opts().mode)
console.log("Mode options: ", program.args)


process.on("exit", code => {
    console.log('Este codigo se ejecuta antes de salir del proceso', code)
})

process.on('uncaughtException', exception => {
    console.log('Esta exception no fue capturada o controlada', exception)
})

process.on('message', message => {
 console.log('Este codigo se ejecutara cuando reciba un mensaje de otro proceso', message)
})

export default program; 
