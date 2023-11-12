const Garbage={
    Key:{
        data:[],
        dispose:function(){
            this.data.map(n=>n?.event?.dispose())
            return this;
        },
        destroy:function(){
            this.dispose();
            this.data.length=0;
            return this;
        }
    },
    Pointer:{
        data:[],
        dispose:function(){
            this.data.map(n=>n?.event?.dispose())
            return this;
        },
        destroy:function(){
            this.dispose();
            this.data.length=0;
            return this;
        }
    },
    Drag:{
        data:[],
        dispose:function(){
            this.data.map(n=>n?.event?.dispose())
            return this;
        },
        destroy:function(){
            this.dispose();
            this.data.length=0;
            return this;
        }
    }
}
export default Garbage