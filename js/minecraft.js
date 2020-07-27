var reader = new FileReader();

reader.addEventListener('load', function (e) {

    nbt.parse(e.target.result.toString(), function(error, data) {
        if (error) { throw error; }

        console.log(data.value.stringTest.value);
        console.log(data.value['nested compound test'].value);
    });

});
reader.readAsArrayBuffer('data/playerdata/83a71a90-51e1-4eb9-906d-669b3650c47d.dat');