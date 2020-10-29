const app = require("./server");

require("./server");

app.listen(app.get('port'), () => {console.log(`Server on port ${app.get('port')}`)});
