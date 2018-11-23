var message = {
    error:(info)=>{
        console.error("message",info);        
    },
    warn:(info)=>{
        console.warn("message",info);
    },
    log:(info)=>{
        console.log("message",info);
    }
}
export default message;