//机械动力：火炮-现代战争 物品配方
//作者: 小麦LogicWheat
//适配版本: CBC Modern Warfare 0.0.5f
//配方版本: v3.0
//需要Mods: KubeJS 6; KubeJS Create
//本项目遵循MIT协议
//项目仓库: https://github.com/LogicWheat/CBC-Modern-Warfare-Recipes
//注：由于技术原因，目前火炮炮管使用动力合成器进行合成，需要在合成并搭建后进行手动焊接。
ServerEvents.recipes( event => {
    const { create } = event.recipes

    //### 火炮外围设备 ###
    //紧凑型火炮底座
    event.shaped('cbcmodernwarfare:compact_mount',[
        ' P ',
        'SAS',
        'GPG'
    ],{
        P:'#forge:plates/iron',
        S:'create:shaft',
        A:'create:andesite_casing',
        G:'minecraft:gunpowder'
    })
    //转管机枪弹药箱
    event.shaped('cbcmodernwarfare:rotarycannon_ammo_drum',[
        ' S ',
        'P P',
        'PPP'
    ],{
        S:'#forge:ingots/steel',
        P:'#forge:plates/iron'
    })


    //### 材料 ###
    //惰性炸药
    create.mixing('2x cbcmodernwarfare:inert_explosives',['minecraft:gunpowder','minecraft:clay_ball'])
    //重型复进弹簧
    create.compacting('cbcmodernwarfare:heavy_recoil_spring',['createbigcannons:recoil_spring','2x #forge:ingots/steel']).heated()


    //### 火炮炮管/导轨 ###

    //## 火箭导轨 ##
    //火箭发射导轨
    event.shaped('2x cbcmodernwarfare:rocket_rails',[
        'C C',
        'C C',
        'C C'
    ],{
        C:'#forge:ingots/industrial_iron'
    })
    //火箭发射导轨尾部
    event.shaped('cbcmodernwarfare:rocket_rails_end',[
        'C C',
        'C C',
        'CCC'
    ],{
        C:'#forge:ingots/industrial_iron'
    })

    //## 中型火炮 ##
    //铸铁火炮


    //### 功能性弹头 ###
    //燃烧弹头
    event.shapeless('4x cbcmodernwarfare:incendiary_tip',['minecraft:flint','minecraft:blaze_powder'])


    //### 火炮弹药 ###

    //## 火炮弹药合成 ##
    //HEAT
    event.shaped('cbcmodernwarfare:heap_shell',[
        'ICI',
        'ITI',
        'IWI'
    ],{
        I:'#forge:ingots/iron',
        C:'minecraft:copper_ingot',
        T:'minecraft:tnt',
        W:'#minecraft:wooden_slabs'
    })
    //HE-F
    create.mechanical_crafting('cbcmodernwarfare:hefrag_shell',[
        'I I',
        'I I',
        'ITI',
        ' W '
    ],{
        I:'#forge:ingots/iron',
        T:'minecraft:tnt',
        W:'#minecraft:wooden_slabs'
    })
    //APDS
    create.mechanical_crafting('cbcmodernwarfare:apds_shot',[
        ' S ',
        'ISI',
        'ISI',
        ' W '
    ],{
        I:'#forge:ingots/iron',
        S:'#forge:ingots/steel',
        W:'#minecraft:wooden_slabs'
    })
    //APFSDS
    create.mechanical_crafting('cbcmodernwarfare:apfsds_mediumcannon_round',[
        ' N ',
        'INI',
        'INI',
        ' N ',
        'S S'
    ],{
        I:'#forge:ingots/iron',
        N:'createbigcannons:nethersteel_ingot',
        S:'#forge:ingots/steel'
    })
    //HVAP
    create.deploying('cbcmodernwarfare:hvap_autocannon_round',['createbigcannons:ap_autocannon_round','minecraft:gunpowder'])
    //榴霰弹弹头
    create.cutting('4x cbcmodernwarfare:canister_autocannon_round','createbigcannons:shrapnel_shell')

    //## 大-中弹头 互相转换 ## (第一行:大转中,第二行:中转大)
    //AP
    event.shapeless('2x cbcmodernwarfare:ap_mediumcannon_round','createbigcannons:ap_shot')
    event.shapeless('createbigcannons:ap_shot','2x cbcmodernwarfare:ap_mediumcannon_round')
    //APHE
    event.shapeless('2x cbcmodernwarfare:aphe_mediumcannon_round','createbigcannons:ap_shell')
    event.shapeless('createbigcannons:ap_shell','2x cbcmodernwarfare:aphe_mediumcannon_round')
    //APDS
    event.shapeless('2x cbcmodernwarfare:apds_mediumcannon_round','cbcmodernwarfare:apds_shot')
    event.shapeless('cbcmodernwarfare:apds_shot','2x cbcmodernwarfare:apds_mediumcannon_round')
    //榴霰弹
    event.shapeless('2x cbcmodernwarfare:canister_mediumcannon_round','createbigcannons:shrapnel_shell')
    event.shapeless('createbigcannons:shrapnel_shell','2x cbcmodernwarfare:canister_mediumcannon_round')
    //HE
    event.shapeless('2x cbcmodernwarfare:he_mediumcannon_round','createbigcannons:he_shell')
    event.shapeless('createbigcannons:he_shell','2x cbcmodernwarfare:he_mediumcannon_round')
    //HE-F
    event.shapeless('2x cbcmodernwarfare:hef_mediumcannon_round','cbcmodernwarfare:hefrag_shell')
    event.shapeless('cbcmodernwarfare:hefrag_shell','2x cbcmodernwarfare:hef_mediumcannon_round')
    //HEAT
    event.shapeless('2x cbcmodernwarfare:heap_mediumcannon_round','cbcmodernwarfare:heap_shell')
    event.shapeless('cbcmodernwarfare:heap_shell','2x cbcmodernwarfare:heap_mediumcannon_round')
    //烟雾弹
    event.shapeless('2x cbcmodernwarfare:smoke_mediumcannon_round','createbigcannons:smoke_shell')
    event.shapeless('createbigcannons:smoke_shell','2x cbcmodernwarfare:smoke_mediumcannon_round')

    //## 中型火炮弹药头装入弹药 ## (包含:工作台合成+机械手装配)
    //AP
    event.shaped(Item.of('cbcmodernwarfare:ap_mediumcannon_cartridge', '{Projectile:{Count:1b,id:"cbcmodernwarfare:ap_mediumcannon_round"}}'),[
        ' R ',
        ' C '
    ],{
        R:'cbcmodernwarfare:ap_mediumcannon_round',
        C:'cbcmodernwarfare:filled_mediumcannon_cartridge'
    })
    create.deploying(Item.of('cbcmodernwarfare:ap_mediumcannon_cartridge', '{Projectile:{Count:1b,id:"cbcmodernwarfare:ap_mediumcannon_round"}}'),['cbcmodernwarfare:filled_mediumcannon_cartridge','cbcmodernwarfare:aphe_mediumcannon_round'])
    //APHE
    event.shaped(Item.of('cbcmodernwarfare:aphe_mediumcannon_cartridge', '{Projectile:{Count:1b,id:"cbcmodernwarfare:aphe_mediumcannon_round"}}'),[
        ' R ',
        ' C '
    ],{
        R:'cbcmodernwarfare:aphe_mediumcannon_round',
        C:'cbcmodernwarfare:filled_mediumcannon_cartridge'
    })
    create.deploying(Item.of('cbcmodernwarfare:aphe_mediumcannon_cartridge', '{Projectile:{Count:1b,id:"cbcmodernwarfare:aphe_mediumcannon_round"}}'),['cbcmodernwarfare:filled_mediumcannon_cartridge','cbcmodernwarfare:aphe_mediumcannon_round'])
    //APDS
    event.shaped(Item.of('cbcmodernwarfare:apds_mediumcannon_cartridge', '{Projectile:{Count:1b,id:"cbcmodernwarfare:apds_mediumcannon_round"}}'),[
        ' R ',
        ' C '
    ],{
        R:'cbcmodernwarfare:apds_mediumcannon_round',
        C:'cbcmodernwarfare:filled_mediumcannon_cartridge'
    })
    create.deploying(Item.of('cbcmodernwarfare:apds_mediumcannon_cartridge', '{Projectile:{Count:1b,id:"cbcmodernwarfare:apds_mediumcannon_round"}}'),['cbcmodernwarfare:filled_mediumcannon_cartridge','cbcmodernwarfare:apds_mediumcannon_round'])
    //APFSDS
    event.shaped(Item.of('cbcmodernwarfare:apfsds_mediumcannon_cartridge', '{Projectile:{Count:1b,id:"cbcmodernwarfare:apfsds_mediumcannon_round"}}'),[
        ' R ',
        ' C '
    ],{
        R:'cbcmodernwarfare:apfsds_mediumcannon_round',
        C:'cbcmodernwarfare:filled_mediumcannon_cartridge'
    })
    create.deploying(Item.of('cbcmodernwarfare:apfsds_mediumcannon_cartridge', '{Projectile:{Count:1b,id:"cbcmodernwarfare:apfsds_mediumcannon_round"}}'),['cbcmodernwarfare:filled_mediumcannon_cartridge','cbcmodernwarfare:apfsds_mediumcannon_round'])
    //榴霰弹
    event.shaped(Item.of('cbcmodernwarfare:canister_mediumcannon_cartridge', '{Projectile:{Count:1b,id:"cbcmodernwarfare:canister_mediumcannon_round"}}'),[
        ' R ',
        ' C '
    ],{
        R:'cbcmodernwarfare:canister_mediumcannon_round',
        C:'cbcmodernwarfare:filled_mediumcannon_cartridge'
    })
    create.deploying(Item.of('cbcmodernwarfare:canister_mediumcannon_cartridge', '{Projectile:{Count:1b,id:"cbcmodernwarfare:canister_mediumcannon_round"}}'),['cbcmodernwarfare:filled_mediumcannon_cartridge','cbcmodernwarfare:canister_mediumcannon_round'])
    //HE
    event.shaped(Item.of('cbcmodernwarfare:he_mediumcannon_cartridge', '{Projectile:{Count:1b,id:"cbcmodernwarfare:he_mediumcannon_round"}}'),[
        ' R ',
        ' C '
    ],{
        R:'cbcmodernwarfare:he_mediumcannon_round',
        C:'cbcmodernwarfare:filled_mediumcannon_cartridge'
    })
    create.deploying(Item.of('cbcmodernwarfare:he_mediumcannon_cartridge', '{Projectile:{Count:1b,id:"cbcmodernwarfare:he_mediumcannon_round"}}'),['cbcmodernwarfare:filled_mediumcannon_cartridge','cbcmodernwarfare:he_mediumcannon_round'])
    //HE-F
    event.shaped(Item.of('cbcmodernwarfare:hef_mediumcannon_cartridge', '{Projectile:{Count:1b,id:"cbcmodernwarfare:hef_mediumcannon_round"}}'),[
        ' R ',
        ' C '
    ],{
        R:'cbcmodernwarfare:hef_mediumcannon_round',
        C:'cbcmodernwarfare:filled_mediumcannon_cartridge'
    })
    create.deploying(Item.of('cbcmodernwarfare:hef_mediumcannon_cartridge', '{Projectile:{Count:1b,id:"cbcmodernwarfare:hef_mediumcannon_round"}}'),['cbcmodernwarfare:filled_mediumcannon_cartridge','cbcmodernwarfare:hef_mediumcannon_round'])
    //HEAT
    event.shaped(Item.of('cbcmodernwarfare:heap_mediumcannon_cartridge', '{Projectile:{Count:1b,id:"cbcmodernwarfare:heap_mediumcannon_round"}}'),[
        ' R ',
        ' C '
    ],{
        R:'cbcmodernwarfare:heap_mediumcannon_round',
        C:'cbcmodernwarfare:filled_mediumcannon_cartridge'
    })
    create.deploying(Item.of('cbcmodernwarfare:heap_mediumcannon_cartridge', '{Projectile:{Count:1b,id:"cbcmodernwarfare:heap_mediumcannon_round"}}'),['cbcmodernwarfare:filled_mediumcannon_cartridge','cbcmodernwarfare:heap_mediumcannon_round'])
    //烟雾弹
    event.shaped(Item.of('cbcmodernwarfare:smoke_mediumcannon_cartridge', '{Projectile:{Count:1b,id:"cbcmodernwarfare:smoke_mediumcannon_round"}}'),[
        ' R ',
        ' C '
    ],{
        R:'cbcmodernwarfare:smoke_mediumcannon_round',
        C:'cbcmodernwarfare:filled_mediumcannon_cartridge'
    })
    create.deploying(Item.of('cbcmodernwarfare:smoke_mediumcannon_cartridge', '{Projectile:{Count:1b,id:"cbcmodernwarfare:smoke_mediumcannon_round"}}'),['cbcmodernwarfare:filled_mediumcannon_cartridge','cbcmodernwarfare:smoke_mediumcannon_round'])


    //### 推进器/发射药 ###

    //## 中型火炮弹药壳 ##
    //中型火炮弹药冲压板
    event.shaped('cbcmodernwarfare:mediumcannon_cartridge_sheet',[
        'PP '
    ],{
        P:'#createbigcannons:sheet_copper'
    })
    event.shaped('cbcmodernwarfare:mediumcannon_cartridge_sheet',[
        'PP '
    ],{
        P:'#forge:plates/brass'
    })
    //中型火炮弹药壳制作和填装
    create.sequenced_assembly([
        'cbcmodernwarfare:empty_mediumcannon_cartridge'
    ],'cbcmodernwarfare:mediumcannon_cartridge_sheet',[
        create.pressing('createbigcannons:partially_formed_big_cartridge',['cbcmodernwarfare:mediumcannon_cartridge_sheet'])
    ]).transitionalItem('createbigcannons:partially_formed_big_cartridge').loops(5)
    event.shapeless('cbcmodernwarfare:filled_mediumcannon_cartridge',['cbcmodernwarfare:empty_mediumcannon_cartridge','2x createbigcannons:nitropowder'])

    //## 固体燃料系列 ##
    //固体燃料罐
    event.shaped('cbcmodernwarfare:solid_fuel_tank',[
        'PEP',
        'PEP',
        'PEP'
    ],{
        P:'#forge:plates/iron',
        E:'cbcmodernwarfare:inert_explosives'
    })
    //固体燃料推进器
    create.deploying('cbcmodernwarfare:solid_fuel_thruster',['cbcmodernwarfare:solid_fuel_tank','#forge:plates/iron'])
    //分离式固体燃料推进器
    event.shaped('2x cbcmodernwarfare:solid_fuel_split_thruster',[
        ' T ',
        ' G '
    ],{
        T:'cbcmodernwarfare:solid_fuel_thruster',
        G:'cbcmodernwarfare:solid_fuel_tank'
    })


    //### 装甲 ###

    //## 普通装甲系列 ##
    //碳素钢
    create.compacting('cbcmodernwarfare:carbon_steel_block',['#minecraft:coals','8x #forge:ingots/steel']).heated()
    event.shaped('4x cbcmodernwarfare:carbon_steel_stairs',[
        'E  ',
        'EE ',
        'EEE'
    ],{
        E:'cbcmodernwarfare:carbon_steel_block',
    })
    event.shaped('6x cbcmodernwarfare:carbon_steel_slab',[
        'EEE'
    ],{
        E:'cbcmodernwarfare:carbon_steel_block',
    })
    //NERA
    create.compacting('cbcmodernwarfare:composite_block',['cbcmodernwarfare:carbon_steel_block','cbcmodernwarfare:carbon_steel_block'])

    //## 爆炸反应装甲（ERA）系列 ##
    //ERA
    event.shaped('4x cbcmodernwarfare:era_block',[
        'III',
        'GGG',
        'III'
    ],{
        I:'create:iron_sheet',
        G:'minecraft:gunpowder'
    })
    event.shaped('4x cbcmodernwarfare:era_stairs',[
        'E  ',
        'EE ',
        'EEE'
    ],{
        E:'cbcmodernwarfare:era_block'
    })
    event.shaped('6x cbcmodernwarfare:era_slab',[
        'EEE'
    ],{
        E:'cbcmodernwarfare:era_block'
    })
    event.shaped('6x cbcmodernwarfare:era_vertical_slab',[
        'E  ',
        'E  ',
        'E  '
    ],{
        E:'cbcmodernwarfare:era_block'
    })
    //黄色ERA
    event.shaped('8x cbcmodernwarfare:tan_era_block',[
        'EEE',
        'EYE',
        'EEE'
    ],{
        E:'cbcmodernwarfare:era_block',
        Y:'minecraft:yellow_dye'
    })
    event.shaped('4x cbcmodernwarfare:tan_era_stairs',[
        'E  ',
        'EE ',
        'EEE'
    ],{
        E:'cbcmodernwarfare:tan_era_block'
    })
    event.shaped('6x cbcmodernwarfare:tan_era_slab',[
        'EEE'
    ],{
        E:'cbcmodernwarfare:tan_era_block'
    })
    event.shaped('6x cbcmodernwarfare:tan_era_vertical_slab',[
        'E  ',
        'E  ',
        'E  '
    ],{
        E:'cbcmodernwarfare:tan_era_block'
    })
    //绿色ERA
    event.shaped('8x cbcmodernwarfare:green_era_block',[
        'EEE',
        'EGE',
        'EEE'
    ],{
        E:'cbcmodernwarfare:era_block',
        G:'minecraft:green_dye'
    })
    event.shaped('4x cbcmodernwarfare:green_era_stairs',[
        'E  ',
        'EE ',
        'EEE'
    ],{
        E:'cbcmodernwarfare:green_era_block'
    })
    event.shaped('6x cbcmodernwarfare:green_era_slab',[
        'EEE'
    ],{
        E:'cbcmodernwarfare:green_era_block'
    })
    event.shaped('6x cbcmodernwarfare:green_era_vertical_slab',[
        'E  ',
        'E  ',
        'E  '
    ],{
        E:'cbcmodernwarfare:green_era_block'
    })
})