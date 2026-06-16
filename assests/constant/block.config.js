const BLOCK_DEFINITIONS = [
  /* Pin Setup */
  {
    category:'Pin Setup', type:'setPin', cls:'b-pin',
    label:'setPin', hint:'set pin as INPUT or OUTPUT',
    defaults:{ pin:'13', mode:'OUTPUT' },
    fields:[
      { kind:'text', label:'setPin' },
      { kind:'input', key:'pin', width:30 },
      { kind:'text', label:'as' },
      { kind:'select', key:'mode', options:['OUTPUT','INPUT','INPUT_PULLUP'] }
    ],
    code:'  {{_indent}}pinMode({{pin}}, {{mode}});'
  },
  /* Digital */
  {
    category:'Digital', type:'pinOn', cls:'b-write',
    label:'pinOn', hint:'turn a pin HIGH',
    defaults:{ pin:'13' },
    fields:[
      { kind:'text', label:'pinOn pin' },
      { kind:'input', key:'pin', width:30 }
    ],
    code:'  {{_indent}}digitalWrite({{pin}}, HIGH);'
  },
  {
    category:'Digital', type:'pinOff', cls:'b-write',
    label:'pinOff', hint:'turn a pin LOW',
    defaults:{ pin:'13' },
    fields:[
      { kind:'text', label:'pinOff pin' },
      { kind:'input', key:'pin', width:30 }
    ],
    code:'  {{_indent}}digitalWrite({{pin}}, LOW);'
  },
  {
    category:'Digital', type:'readPin', cls:'b-read',
    label:'readPin', hint:'read digital pin value',
    defaults:{ pin:'2' },
    fields:[
      { kind:'text', label:'readPin pin' },
      { kind:'input', key:'pin', width:30 },
      { kind:'text', label:'→ val' }
    ],
    code:'  {{_indent}}int val = digitalRead({{pin}});'
  },
  /* Analog */
  {
    category:'Analog', type:'analogWrite', cls:'b-write',
    label:'analogWrite', hint:'write analog value 0–255',
    defaults:{ pin:'9', val:'128' },
    fields:[
      { kind:'text', label:'analogWrite pin' },
      { kind:'input', key:'pin', width:30 },
      { kind:'text', label:'val' },
      { kind:'input', key:'val', width:36 }
    ],
    code:'  {{_indent}}analogWrite({{pin}}, {{val}});'
  },
  {
    category:'Analog', type:'analogRead', cls:'b-read',
    label:'analogRead', hint:'read analog pin A0–A5',
    defaults:{ pin:'A0' },
    fields:[
      { kind:'text', label:'analogRead pin' },
      { kind:'select', key:'pin', options:['A0','A1','A2','A3','A4','A5'] },
      { kind:'text', label:'→ val' }
    ],
    code:'  {{_indent}}int val = analogRead({{pin}});'
  },
  /* Time */
  {
    category:'Time', type:'wait', cls:'b-wait',
    label:'wait', hint:'pause for milliseconds',
    defaults:{ ms:'1000' },
    fields:[
      { kind:'text', label:'wait' },
      { kind:'input', key:'ms', width:50 },
      { kind:'text', label:'ms' }
    ],
    code:'  {{_indent}}delay({{ms}});'
  },
  {
    category:'Time', type:'waitMicro', cls:'b-wait',
    label:'waitMicro', hint:'pause microseconds',
    defaults:{ us:'100' },
    fields:[
      { kind:'text', label:'waitMicro' },
      { kind:'input', key:'us', width:50 },
      { kind:'text', label:'µs' }
    ],
    code:'  {{_indent}}delayMicroseconds({{us}});'
  },
  /* Serial */
  {
    category:'Serial', type:'serialStart', cls:'b-serial',
    label:'serialStart', hint:'begin serial monitor',
    defaults:{ baud:'9600' },
    fields:[
      { kind:'text', label:'serialStart at' },
      { kind:'select', key:'baud', options:['9600','57600','115200'] }
    ],
    code:'  {{_indent}}Serial.begin({{baud}});'
  },
  {
    category:'Serial', type:'serialPrint', cls:'b-serial',
    label:'serialPrint', hint:'print text to monitor',
    defaults:{ msg:'hello' },
    fields:[
      { kind:'text', label:'serialPrint "' },
      { kind:'input', key:'msg', width:70 },
      { kind:'text', label:'"' }
    ],
    code:'  {{_indent}}Serial.print("{{msg}}");'
  },
  {
    category:'Serial', type:'serialPrintLine', cls:'b-serial',
    label:'serialPrintLine', hint:'print + new line',
    defaults:{ msg:'hello' },
    fields:[
      { kind:'text', label:'serialPrintLine "' },
      { kind:'input', key:'msg', width:70 },
      { kind:'text', label:'"' }
    ],
    code:'  {{_indent}}Serial.println("{{msg}}");'
  },
  /* Variable */
  {
    category:'Variable', type:'declareInt', cls:'b-math',
    label:'int var', hint:'declare an integer variable',
    defaults:{ name:'x', val:'0' },
    fields:[
      { kind:'text', label:'int' },
      { kind:'input', key:'name', width:44 },
      { kind:'text', label:'=' },
      { kind:'input', key:'val', width:36 }
    ],
    code:'  {{_indent}}int {{name}} = {{val}};'
  },
  {
    category:'Variable', type:'assignVar', cls:'b-math',
    label:'set var', hint:'assign value to a variable',
    defaults:{ name:'x', val:'0' },
    fields:[
      { kind:'input', key:'name', width:44 },
      { kind:'text', label:'=' },
      { kind:'input', key:'val', width:44 }
    ],
    code:'  {{_indent}}{{name}} = {{val}};'
  },
  /* Control Flow */
  {
    category:'Control Flow', type:'ifBlock', cls:'b-control',
    label:'if', hint:'if condition with nested blocks',
    defaults:{ cond:'val == HIGH' },
    fields:[
      { kind:'text', label:'if (' },
      { kind:'input', key:'cond', width:110 },
      { kind:'text', label:') {' }
    ],
    hasChildren: true,
    code:'  {{_indent}}if ({{cond}}) {'
  },
  {
    category:'Control Flow', type:'whileBlock', cls:'b-control',
    label:'while', hint:'while loop with nested blocks',
    defaults:{ cond:'true' },
    fields:[
      { kind:'text', label:'while (' },
      { kind:'input', key:'cond', width:110 },
      { kind:'text', label:') {' }
    ],
    hasChildren: true,
    code:'  {{_indent}}while ({{cond}}) {'
  },
  {
    category:'Control Flow', type:'forBlock', cls:'b-control',
    label:'for', hint:'for loop with nested blocks',
    defaults:{ init:'int i=0', cond:'i<10', inc:'i++' },
    fields:[
      { kind:'text', label:'for (' },
      { kind:'input', key:'init', width:60 },
      { kind:'text', label:';' },
      { kind:'input', key:'cond', width:50 },
      { kind:'text', label:';' },
      { kind:'input', key:'inc', width:40 },
      { kind:'text', label:') {' }
    ],
    hasChildren: true,
    code:'  {{_indent}}for ({{init}}; {{cond}}; {{inc}}) {'
  }
];