const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');const {spawnSync}=require('node:child_process');
test('active Python generators retain interfaces but cannot fabricate author identity or auto-publish',()=>{const repo=path.resolve(__dirname,'../..');const files=['create_article.py','create_article_git.py','protocol_sentinal_blog_creator.py','blog/source/scripts/generate_post.py','scripts/notify-google.py'];const code=`import ast, pathlib, typing
root=pathlib.Path(${JSON.stringify(repo)})
for name in ${JSON.stringify(files)}:
 source=(root/name).read_text(); tree=ast.parse(source)
 if name in ('create_article.py','create_article_git.py','protocol_sentinal_blog_creator.py'):
  author=next(n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name=='generate_author_name')
  ns={'Tuple':typing.Tuple}; exec(compile(ast.Module(body=[author],type_ignores=[]),name,'exec'),ns)
  assert ns['generate_author_name']()==('Protocol Sentinel desk','protocol-sentinel')
  assert 'draft: true' in source and 'published: false' in source and 'evidence_status: source-review-pending' in source
  for n in tree.body:
   if isinstance(n,ast.FunctionDef) and n.name=='push_to_github':
    assert not any(isinstance(c,ast.Call) and isinstance(c.func,ast.Attribute) and c.func.attr in ('run','post','put') for c in ast.walk(n))
 if name.endswith('notify-google.py'):
  assert not any(isinstance(n,(ast.Import,ast.ImportFrom)) and ('requests' in ast.unparse(n) or 'google.oauth2' in ast.unparse(n)) for n in ast.walk(tree))
print('5 Python entrypoints parse; deterministic author interfaces and mutation-free compatibility helpers verified.')
`;const r=spawnSync('python3',['-c',code],{encoding:'utf8'});assert.equal(r.status,0,r.stderr);});
