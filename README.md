> ❗️[Hotslogs.com has officially shut down](https://www.reddit.com/r/heroesofthestorm/comments/15e1vsi/hotslogscom_is_officially_shutting_down/). Web API they were providing was the base of this package. Therefore, it is useless now and thus repo has been archived.

# hotslogs
A Node module for HOTS (Heroes of the Storm) Logs.

#### Installation
```bash
$ npm install hotslogs
```

#### How to use
```javascript
var hl = require('hotslogs');

hl.getID('machina#2809', 'EU', function (id) {
	console.log(id);		// 5358817
});

hl.getData(5358817, function (player) {
	console.log(player.name);	// machina
});

```

#### Documentation
**getID(battletag, region, callback);**

Arguments:
* *battletag* (string)
* *region* (string): shortcut e.g. 'EU', 'US', 'KR', 'CN'
* *callback* (function): with integer argument

The above function allows you to acquire an unique ID on HOTS Logsfrom which you could generate such link: (http://www.hotslogs.com/Player/Profile?PlayerID=5358817)

**getData(id, callback);**

Arguments:
* *id* (integer): can be acquired with getID(...)
* *callback* (function): with object argument

The above function allows you to acquire such kind of object:
```javascript
{
	id: 5358817,
	name: "machina",
	rankings: {
		quickMatch: {
			MMR: 2087,
			rank: 13222
		},
		heroLeague: {
			MMR: 1688,
			rank: 11992
		},
		teamLeague: {
			MMR: null,	// because player never played Team League
			rank: null
		}
	}
}
```

#### Remark
It is unofficial API support for http://www.hotslogs.com.

#### License
MIT
