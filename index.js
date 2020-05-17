function allMacAddressCommand() {
  switch(process.platform) {
    case 'darwin':
      return `ifconfig | grep -v "\t" | awk -F':' '{print $1}' | xargs -n1 networksetup -getmacaddress | grep -v "Error"`
    case 'linux':
      return `ifconfig -a | grep "^[a-zA-Z0-9]" | awk -F':' '{print cat $1}' | while read -r line; do  cat /sys/class/net/$line/address; done`
    default:
      throw new Error(`Platform ${process.platform} is not supported! Please create an issue in github.`)
  }
}

if(module){
  module.exports = allMacAddressCommand
}

