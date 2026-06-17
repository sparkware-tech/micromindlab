const BLOCK_DEFINITIONS = [
  /* Pin Setup */
  {
    category:'Pin Setup', type:'definePin', cls:'b-pin',
    label:'definePin', hint:'define a pin with a name',
    defaults:{ name:'LED_PIN', pin:'13' },
    fields:[
      { kind:'text', label:'definePin' },
      { kind:'input', key:'pin', width:30 },
      { kind:'text', label:'as' },
      { kind:'input', key:'name', width:100 },
    ],
    code:'  {{_indent}}#define {{name}} {{pin}}'
  },
  {
    category:'Pin Setup', type:'setPin', cls:'b-pin',
    label:'setPin', hint:'set pin as INPUT or OUTPUT',
    defaults:{ pin:'13', mode:'OUTPUT' },
    fields:[
      { kind:'text', label:'setPin' },
      { kind:'input', key:'pin', width:30 },
      { kind:'text', label:'as' },
      { kind:'select', key:'mode', options:['OUTPUT','INPUT'] }
    ],
    code:'  {{_indent}}pinMode({{pin}}, {{mode}});'
  },
  /* Digital */
  {
    category:'Digital', type:'pinOn', cls:'b-digital',
    label:'pinOn', hint:'turn a pin HIGH',
    defaults:{ pin:'13' },
    fields:[
      { kind:'text', label:'pinOn' },
      { kind:'input', key:'pin', width:30 }
    ],
    code:'  {{_indent}}digitalWrite({{pin}}, HIGH);'
  },
  {
    category:'Digital', type:'pinOff', cls:'b-digital',
    label:'pinOff', hint:'turn a pin LOW',
    defaults:{ pin:'13' },
    fields:[
      { kind:'text', label:'pinOff' },
      { kind:'input', key:'pin', width:30 }
    ],
    code:'  {{_indent}}digitalWrite({{pin}}, LOW);'
  },
  {
    category:'Digital', type:'readPin', cls:'b-digital',
    label:'readPin', hint:'read digital pin value',
    defaults:{ pin:'2' },
    fields:[
      { kind:'text', label:'readPin' },
      { kind:'input', key:'pin', width:30 },
      { kind:'text', label:'→ val' }
    ],
    code:'  {{_indent}}int val = digitalRead({{pin}});'
  },
  /* Analog */
  {
    category:'Analog', type:'analogWrite', cls:'b-analog',
    label:'writePin', hint:'write analog value 0–255',
    defaults:{ pin:'9', val:'128' },
    fields:[
      { kind:'text', label:'writePin' },
      { kind:'input', key:'pin', width:30 },
      { kind:'text', label:'value' },
      { kind:'input', key:'val', width:36 }
    ],
    code:'  {{_indent}}analogWrite({{pin}}, {{val}});'
  },
  {
    category:'Analog', type:'analogRead', cls:'b-analog',
    label:'readPin', hint:'read analog pin A0–A5',
    defaults:{ pin:'A0' },
    fields:[
      { kind:'text', label:'readPin' },
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
    category:'Variable', type:'declareInt', cls:'b-var',
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
    category:'Variable', type:'assignVar', cls:'b-var',
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
    category:'Control Flow', type:'elseBlock', cls:'b-control',
    label:'else', hint:'else condition with nested blocks (requires preceding if block)',
    defaults:{ cond:'val == LOW' },
    fields:[
      { kind:'text', label:'else' },
      { kind:'text', label:' {' }
    ],
    hasChildren: true,
    code:'  {{_indent}}else {'
  },
  {
    category:'Control Flow', type:'whileBlock', cls:'b-control',
    label:'till', hint:'repeat till condition is false with nested blocks',
    defaults:{ cond:'true' },
    fields:[
      { kind:'text', label:'till (' },
      { kind:'input', key:'cond', width:110 },
      { kind:'text', label:') {' }
    ],
    hasChildren: true,
    code:'  {{_indent}}while ({{cond}}) {'
  },
  {
    category:'Control Flow', type:'forBlock', cls:'b-control',
    label:'repeat', hint:'repeat block for a number of iterations with nested blocks',
    defaults:{ init:'int i=0', cond:'10', inc:'i++' },
    fields:[
      { kind:'text', label:'repeat (' },
      { kind:'input', key:'cond', width:50 },
      { kind:'text', label:') {' }
    ],
    hasChildren: true,
    code:'  {{_indent}}for ({{init}}; {{cond}}; {{inc}}) {'
  },
   /* Maths */
  {
    category:'Math', type:'sumBlock', cls:'b-math',
    label:'sum', hint:'sum of two numbers',
    defaults:{ result: 'result', num1:'num1', num2:'num2' },
    fields:[
      { kind:'input', key:'result', width:50 },
      { kind:'text', label:'=' },
      { kind:'input', key:'num1', width:50 },
      { kind:'text', label:'+' },
      { kind:'input', key:'num2', width:50 },
    ],
    code:'  {{_indent}}{{result}} = {{num1}} + {{num2}};'
  },
  {
    category:'Math', type:'sumBlock', cls:'b-math',
    label:'sub', hint:'subtraction of two numbers',
    defaults:{ result: 'result', num1:'num1', num2:'num2' },
    fields:[
      { kind:'input', key:'result', width:50 },
      { kind:'text', label:'=' },
      { kind:'input', key:'num1', width:50 },
      { kind:'text', label:'-' },
      { kind:'input', key:'num2', width:50 },
    ],
    code:'  {{_indent}}{{result}} = {{num1}} - {{num2}};'
  },
  /* Library */
  {
    category:'Library', type:'includeLibrary', cls:'b-global',
    label:'insert', hint:'insert a library',
    defaults:{ lib: 'Servo.h' },
    fields:[
      { kind:'text', label:'insert' },
      { kind:'select', key:'lib', options:['Servo.h','DHT.h','Wire.h'] },
    ],
    code:'  {{_indent}}#include ({{lib}})'
  },
  {
    category:'Library', type:'objectDefine', cls:'b-global',
    label:'create object', hint:'create a object from a library',
    defaults:{ ob: 'Servo', name: 'myServo' },
    fields:[
      { kind:'text', label:'create' },
      { kind:'input', key:'name', width:70 },
      { kind:'text', label:'from' },
      { kind:'select', key:'ob', options:['Servo','DHT'] },
    ],
    code:'  {{_indent}}{{ob}} {{name}};'
  },
  /* Servo motor */
  {
    category:'Servo Motor', type:'servoDefine', cls:'b-sensor',
    label:'create servo', hint:'define a servo motor',
    defaults:{  name: 'myServo' },
    fields:[
      { kind:'text', label:'create' },
      { kind:'input', key:'name', width:70 },
      { kind:'text', label:'from Servo' },
    ],
    code:'  {{_indent}}Servo {{name}};'
  },
  {
    category:'Servo Motor', type:'servoAttach', cls:'b-sensor',
    label:'attach servo', hint:'attach servo motor to pin',
    defaults:{ name: 'myServo', pin: '9' },
    fields:[
      { kind:'text', label:'attach' },
      { kind:'input', key:'name', width:70 },
      { kind:'text', label:'to pin' },
      { kind:'input', key:'pin', width:40 },
    ],
    code:'  {{_indent}}{{name}}.attach({{pin}});'
  },
  {
    category:'Servo Motor', type:'turnServo', cls:'b-sensor',
    label:'turn servo', hint:'turn the motor',
    defaults:{ name: 'myServo', angle: '90' },
    fields:[
      { kind:'text', label:'turn' },
      { kind:'input', key:'name', width:70 },
      { kind:'text', label:'angle' },
      { kind:'input', key:'angle', width:70 },
    ],
    code:'  {{_indent}}{{name}}.Write({{angle}});'
  }
];