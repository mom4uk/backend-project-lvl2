
const rightOutputStylish = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      + setting3: {
            key: value
        }
      - setting3: true
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              + wow: so much
              - wow: too much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
      + nest: str
      - nest: {
            key: value
        }
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        fee: 100500
        deep: {
            id: {
                number: 45
            }
        }
    }
}`;

const rightOutputPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to [complex value]
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From 'too much' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const rightOutputJson = '[{"key":"common","children":[{"key":"follow","value":false,"type":"added"},{"key":"setting1","value":"Value 1","type":"unchanged"},{"key":"setting2","value":200,"type":"removed"},{"key":"setting3","oldValue":true,"newValue":{"key":"value"},"type":"changed"},{"key":"setting4","value":"blah blah","type":"added"},{"key":"setting5","value":{"key5":"value5"},"type":"added"},{"key":"setting6","children":[{"key":"doge","children":[{"key":"wow","oldValue":"too much","newValue":"so much","type":"changed"}],"type":"parent"},{"key":"key","value":"value","type":"unchanged"},{"key":"ops","value":"vops","type":"added"}],"type":"parent"}],"type":"parent"},{"key":"group1","children":[{"key":"baz","oldValue":"bas","newValue":"bars","type":"changed"},{"key":"foo","value":"bar","type":"unchanged"},{"key":"nest","oldValue":{"key":"value"},"newValue":"str","type":"changed"}],"type":"parent"},{"key":"group2","value":{"abc":12345,"deep":{"id":45}},"type":"removed"},{"key":"group3","value":{"fee":100500,"deep":{"id":{"number":45}}},"type":"added"}]';
const rightOutputJsonForIniParser = '[{"key":"common","children":[{"key":"follow","value":false,"type":"added"},{"key":"setting1","value":"Value 1","type":"unchanged"},{"key":"setting2","value":"200","type":"removed"},{"key":"setting3","oldValue":true,"newValue":{"key":"value"},"type":"changed"},{"key":"setting4","value":"blah blah","type":"added"},{"key":"setting5","value":{"key5":"value5"},"type":"added"},{"key":"setting6","children":[{"key":"doge","children":[{"key":"wow","oldValue":"too much","newValue":"so much","type":"changed"}],"type":"parent"},{"key":"key","value":"value","type":"unchanged"},{"key":"ops","value":"vops","type":"added"}],"type":"parent"}],"type":"parent"},{"key":"group1","children":[{"key":"baz","oldValue":"bas","newValue":"bars","type":"changed"},{"key":"foo","value":"bar","type":"unchanged"},{"key":"nest","oldValue":{"key":"value"},"newValue":"str","type":"changed"}],"type":"parent"},{"key":"group2","value":{"abc":"12345","deep":{"id":"45"}},"type":"removed"},{"key":"group3","value":{"fee":"100500","deep":{"id":{"number":"45"}}},"type":"added"}]';

export {
  rightOutputStylish,
  rightOutputJson,
  rightOutputPlain,
  rightOutputJsonForIniParser,
};
