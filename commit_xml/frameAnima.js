
let AnimaName = cc.Enum({
    None: 0
});


cc.Class({
    extends: cc.Component,

    properties: {
        text:{
            default: null,
            type: cc.Texture2D
        },
        json:{
            default: null,
            type: cc.JsonAsset,
            notify(){
                let mc = this.json.json.mc;

                let obj = {None: 0};
                let ti = 0;
                for(let x in mc){
                    obj[x] = ++ti;
                }

                this.enum_obj = obj;

                cc.Class.attr(this, 'act', {
                    type: 'Enum',
                    enumList: cc.Enum.getList(cc.Enum(obj))
                });
            }
        },
        act:{
            type: cc.Enum(AnimaName),
            default: AnimaName.None,
            visible(){
                return this.json != null;
            }
        },
        playOnLoad:{
            default: true
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let f1 = this.act;
        for(let obj in this.enum_obj){
            let q = obj;
            let qq = this.enum_obj[obj];
        }
        let fame_res = this.json.json.res;
        let mc = this.json.json.mc;

        let root = new cc.Node();
        root.parent = this.node;

        root.addComponent(cc.Sprite);
        let animation = root.addComponent(cc.Animation);
        this.m_animation = animation;
        // sprite.spriteFrame = new cc.SpriteFrame(this.text,cc.rect(177,73,59,141),false,cc.v2(-38,-117))

        let frames = {};
        for(let x in fame_res){
            let fd = fame_res[x];
            frames[x] = new cc.SpriteFrame(this.text,cc.rect(fd.x,fd.y,fd.w,fd.h));
        }

        let animas = {};
        for(let y in mc){
            let tfs = [];
            for(let z in mc[y].frames){
                let zd = mc[y].frames[z];
                tfs.push(frames[zd.res]);
            }
            let clip = cc.AnimationClip.createWithSpriteFrames(tfs, mc[y].frameRate);
            clip.name = y;
            animas[y] = clip;
            animation.addClip(clip);
        }

        this.m_animas = animas;

        if(this.act !== 0){
            let ti = 0;
            for(let x in mc){
                ++ti;
                if(ti == this.act){
                    this.play(x,this.playOnLoad);
                    break;
                }
            }
        }
    },

    start () {
        
    },

    play(animaName,isLoop){
        let clip = this.m_animas[animaName];
        if(!clip){
            return;
        }
        clip.wrapMode = isLoop ? cc.WrapMode.Loop : cc.WrapMode.Default;
        this.m_animation.play(animaName);
    },

    _updateAnimaDesc(){
        Editor.info("hello...");
    }

    // update (dt) {},
});
