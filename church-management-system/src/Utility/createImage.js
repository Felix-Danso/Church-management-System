import { getInitials } from "./getInitials";

export const createImageFromInitials = (size, color) => {
    const role = JSON.parse(localStorage.getItem("user"))?.role__name;
    const user = JSON.parse(localStorage.getItem('user')) 
    let name;
    if(role === "Patient") {
        name = user?.first_name + " " + user?.last_name
    }
    else{
        name = user?.full_name
    }
    // if (name === ) return;
    // name=getInitials(name)

    const canvas=document.createElement('canvas')
    const context=canvas.getContext('2d')
    canvas.width=canvas.height=size

    context.fillStyle="#ffffff"
    context.fillRect(0,0,size,size)

    context.fillStyle=`${color}50`
    context.fillRect(0,0,size,size)

    context.fillStyle=color;
    context.textBaseline='middle'
    context.textAlign='center'
    context.font =`${size/2}px Roboto`
    context.fillText(name,(size/2),(size/2))

    return canvas.toDataURL()
};

export const createImageFromInitialsName = (size, name, color) => {
    // if (name === null) return;
    name=getInitials(name)

    const canvas=document.createElement('canvas')
    const context=canvas.getContext('2d')
    canvas.width=canvas.height=size

    context.fillStyle="#ffffff"
    context.fillRect(0,0,size,size)

    context.fillStyle=`${color}50`
    context.fillRect(0,0,size,size)

    context.fillStyle=color;
    context.textBaseline='middle'
    context.textAlign='center'
    context.font =`${size/2}px Roboto`
    context.fillText(name,(size/2),(size/2))

    return canvas.toDataURL()
};