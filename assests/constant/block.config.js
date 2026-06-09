/* ============================================================
   ✏️  BLOCK DEFINITIONS — Edit freely here!
   
   Each entry under BLOCK_DEFINITIONS is one draggable block.
   
   Structure of a block definition:
   {
     category : string  — section label in the sidebar (groups blocks visually)
     type     : string  — unique key used internally (no spaces)
     cls      : string  — CSS colour class: b-pin | b-write | b-read | b-wait | b-serial | b-math
     label    : string  — display name shown on the block
     hint     : string  — small description under the label
     defaults : object  — default values for every editable field
     fields   : array   — list of field descriptors that build the inline UI
                          Each field is one of:
                            { kind:'text',   label:'before text' }
                            { kind:'input',  key:'fieldName', width:30 }
                            { kind:'select', key:'fieldName', options:['A','B'] }
     code     : string  — Arduino code template. Use {{fieldName}} for field values.
                          Wrap the whole line; indentation (two spaces) is added automatically.
   }
   
   To ADD a new block   → copy any entry, give it a new unique `type`, edit as needed.
   To REMOVE a block    → delete its entry.
   To REORDER blocks    → move its entry up/down within its category array.
   To ADD a category    → add a new key under BLOCK_DEFINITIONS with an array of blocks.
   ============================================================ */

const BLOCK_DEFINITIONS = [

  /* ── Pin Setup ─────────────────────────────────────────── */
  {
    category: 'Pin Setup',
    type:     'setPin',
    cls:      'b-pin',
    label:    'setPin',
    hint:     'set pin as INPUT or OUTPUT',
    defaults: { pin: '13', mode: 'OUTPUT' },
    fields: [
      { kind: 'text',   label: 'setPin' },
      { kind: 'input',  key: 'pin', width: 30 },
      { kind: 'text',   label: 'as' },
      { kind: 'select', key: 'mode', options: ['OUTPUT', 'INPUT'] }
    ],
    code: '  pinMode({{pin}}, {{mode}});'
  },

  /* ── Digital ────────────────────────────────────────────── */
  {
    category: 'Digital',
    type:     'pinOn',
    cls:      'b-write',
    label:    'pinOn',
    hint:     'turn a pin HIGH',
    defaults: { pin: '13' },
    fields: [
      { kind: 'text',  label: 'pinOn pin' },
      { kind: 'input', key: 'pin', width: 30 }
    ],
    code: '  digitalWrite({{pin}}, HIGH);'
  },
  {
    category: 'Digital',
    type:     'pinOff',
    cls:      'b-write',
    label:    'pinOff',
    hint:     'turn a pin LOW',
    defaults: { pin: '13' },
    fields: [
      { kind: 'text',  label: 'pinOff pin' },
      { kind: 'input', key: 'pin', width: 30 }
    ],
    code: '  digitalWrite({{pin}}, LOW);'
  },
  {
    category: 'Digital',
    type:     'readPin',
    cls:      'b-read',
    label:    'readPin',
    hint:     'read digital pin value',
    defaults: { pin: '2' },
    fields: [
      { kind: 'text',  label: 'readPin pin' },
      { kind: 'input', key: 'pin', width: 30 },
      { kind: 'text',  label: '→ val' }
    ],
    code: '  int val = digitalRead({{pin}});'
  },

  /* ── Analog ─────────────────────────────────────────────── */
  {
    category: 'Analog',
    type:     'analogWrite',
    cls:      'b-write',
    label:    'analogWrite',
    hint:     'write analog value 0–255',
    defaults: { pin: '9', val: '128' },
    fields: [
      { kind: 'text',  label: 'analogWrite pin' },
      { kind: 'input', key: 'pin', width: 30 },
      { kind: 'text',  label: 'val' },
      { kind: 'input', key: 'val', width: 36 }
    ],
    code: '  analogWrite({{pin}}, {{val}});'
  },
  {
    category: 'Analog',
    type:     'analogRead',
    cls:      'b-read',
    label:    'analogRead',
    hint:     'read analog pin A0–A5',
    defaults: { pin: 'A0' },
    fields: [
      { kind: 'text',   label: 'analogRead pin' },
      { kind: 'select', key: 'pin', options: ['A0','A1','A2','A3','A4','A5'] },
      { kind: 'text',   label: '→ val' }
    ],
    code: '  int val = analogRead({{pin}});'
  },

  /* ── Time ───────────────────────────────────────────────── */
  {
    category: 'Time',
    type:     'wait',
    cls:      'b-wait',
    label:    'wait',
    hint:     'pause for milliseconds',
    defaults: { ms: '1000' },
    fields: [
      { kind: 'text',  label: 'wait' },
      { kind: 'input', key: 'ms', width: 50 },
      { kind: 'text',  label: 'ms' }
    ],
    code: '  delay({{ms}});'
  },
  {
    category: 'Time',
    type:     'waitMicro',
    cls:      'b-wait',
    label:    'waitMicro',
    hint:     'pause microseconds',
    defaults: { us: '100' },
    fields: [
      { kind: 'text',  label: 'waitMicro' },
      { kind: 'input', key: 'us', width: 50 },
      { kind: 'text',  label: 'µs' }
    ],
    code: '  delayMicroseconds({{us}});'
  },

  /* ── Serial ─────────────────────────────────────────────── */
  {
    category: 'Serial',
    type:     'serialStart',
    cls:      'b-serial',
    label:    'serialStart',
    hint:     'begin serial monitor',
    defaults: { baud: '9600' },
    fields: [
      { kind: 'text',   label: 'serialStart at' },
      { kind: 'select', key: 'baud', options: ['9600','57600','115200'] }
    ],
    code: '  Serial.begin({{baud}});'
  },
  {
    category: 'Serial',
    type:     'serialPrint',
    cls:      'b-serial',
    label:    'serialPrint',
    hint:     'print text to monitor',
    defaults: { msg: 'hello' },
    fields: [
      { kind: 'text',  label: 'serialPrint "' },
      { kind: 'input', key: 'msg', width: 70 },
      { kind: 'text',  label: '"' }
    ],
    code: '  Serial.print("{{msg}}");'
  },
  {
    category: 'Serial',
    type:     'serialPrintLine',
    cls:      'b-serial',
    label:    'serialPrintLine',
    hint:     'print + new line',
    defaults: { msg: 'hello' },
    fields: [
      { kind: 'text',  label: 'serialPrintLine "' },
      { kind: 'input', key: 'msg', width: 70 },
      { kind: 'text',  label: '"' }
    ],
    code: '  Serial.println("{{msg}}");'
  },

  /* ── Variable ───────────────────────────────────────────── */
  {
    category: 'Variable',
    type:     'declareInt',
    cls:      'b-math',
    label:    'int var',
    hint:     'declare an integer variable',
    defaults: { name: 'x', val: '0' },
    fields: [
      { kind: 'text',  label: 'int' },
      { kind: 'input', key: 'name', width: 44 },
      { kind: 'text',  label: '=' },
      { kind: 'input', key: 'val', width: 36 }
    ],
    code: '  int {{name}} = {{val}};'
  },
  {
    category: 'Variable',
    type:     'assignVar',
    cls:      'b-math',
    label:    'set var',
    hint:     'assign value to a variable',
    defaults: { name: 'x', val: '0' },
    fields: [
      { kind: 'input', key: 'name', width: 44 },
      { kind: 'text',  label: '=' },
      { kind: 'input', key: 'val', width: 44 }
    ],
    code: '  {{name}} = {{val}};'
  },

  /* ── Conditional ────────────────────────────────────────── */
  {
    category: 'Conditional',
    type:     'ifBlock',
    cls:      'b-math',
    label:    'if',
    hint:     'if (condition) { }',
    defaults: { cond: 'val == HIGH' },
    fields: [
      { kind: 'text',  label: 'if (' },
      { kind: 'input', key: 'cond', width: 110 },
      { kind: 'text',  label: ') { }' }
    ],
    code: '  if ({{cond}}) { }'
  }

];
/* ============================================================
   End of BLOCK_DEFINITIONS. No logic changes needed below.
   ============================================================ */