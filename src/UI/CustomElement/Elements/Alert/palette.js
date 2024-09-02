const palette = {
    success: {
        titleColor:"green",
        contentColor: "#35495e",
        bgColor: "#d4edda", // Fixed
        bgColor:"linear-gradient(-225deg, #DFFFCD 0%, #90F9C4 48%, #39F3BB 100%)",
        borderColor: "#28a745", // Fixed
        icon: "✅"
    },
    info: {
        titleColor:"blue",
        contentColor: "#00204a",
        bgColor: "#93deff", // Fixed
        bgColor:"radial-gradient(circle at 10% 20%, rgb(147, 230, 241) 0%, rgb(145, 192, 241) 45.5%)",
        borderColor: "#005689", // Fixed
        icon: "ℹ️"
    },
    warning: {
        titleColor:"#e4663a",
        contentColor: "#45171d",
        bgColor:"#fdffcd",
        bgColor:"radial-gradient(907px at 3.4% 19.8%, rgb(255, 243, 122) 0%, rgb(255, 102, 145) 97.4%)",
        borderColor: "#efd510",
        icon: "⚠️"
    },
    danger: {
        titleColor:"red",
        contentColor: "#721c24",
        bgColor: "#f8d7da", // Fixed
        bgColor:"linear-gradient(90deg, rgb(255, 157, 129) 24.3%, rgb(255, 138, 138) 78.3%)",
        borderColor: "#c50000", // Fixed
        icon: "❌" 
    },
    tips: {
        titleColor:null,
        contentColor: null,
        bgColor: null, 
        borderColor: null,
        icon: "💡" 
    },
    important: {
        titleColor:null,
        contentColor: null,
        bgColor: null,
        borderColor: null,
        icon: "📌" 
    },
    
};
export{
    palette
}