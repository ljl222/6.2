var sha256 = require('js-sha256');
const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')
var $form
var $numb
var $input = '';
var $options
var $fillDefaultHashView
var $fillDefaultHash
var $addressZero
var $hashAddressZero
var $root
var $leaves
var $layers
var $flatLayers
var $tree
var $leaveSelect
var $passLeaf
var $proof
var $passproof
var $verified
var $verifyProof
var $verifyLeaf
var $verifyRoot
var $hash
var $option
var toggleFillDefaultHashView
var $verifyProof
var $verifyLeaf
var $verifyRoot

// var $verifyForm = document.getElementById('verifyForm')
var options = {
    hashLeaves: true,
    sortLeaves: true,
    sortPairs: true
}
var hashFns = {
    sha256: sha256,
    keccak256: keccak256
}
var tree
// functions
function compute(need) {
    const salt = myFunction(need)
    const value = getInputValue()
    const leaves = parseInput(value)
    const hashFn = sha256
    const options = getOptions()
    tree = new MerkleTree(leaves, hashFn, options)
    const hexRoot = tree.getHexRoot()
    const hexLeaves = tree.getHexLeaves()
    const hexLayers = tree.getHexLayers()
    const hexFlatLayers = tree.getHexLayersFlat()
    setRootValue(hexRoot)
    setLeavesValue(JSON.stringify(hexLeaves, null, 2))
    setLayersValue(JSON.stringify(hexLayers, null, 2))
    setFlatLayersValue(JSON.stringify(hexFlatLayers, null, 2))
    setTreeValue(tree.toString())
    updateLeaveOptions(hexLeaves)
    updateProof(0)
    setVerified('-')
    updatepassProof(60)
    return salt;
}
//********************************************************************************************** */
function myFunction(need) {
    var x, text;
    // 获取 id="numb" 的值
    // 定义存放生成随机数的数组
    var array = new Array();
    // 循环N次生成随机数
    for (var i = 0; i <= 100; i++) {
        // 生成100个随机数
        var randomNum = (Math.ceil(Math.random() * 180332255779900447788) + 100);
        array[i] = randomNum;
    }
    x=need
    // x = document.getElementById("numb").value;        //！！！！此处获取输入的分数值
   
    if (isNaN(x) || x < 0 || x > 100 || x === "") {
        text = "输入非法";
    } else {
        text = "输入合法";
    }
    if (text === "输入合法") {
        for (var i = 0; i <= 100; i++) {
            // x = document.getElementById("numb").value;       //此处的numb标号为成绩输入的地方
            
            if (i < 99) {
                if (i <= x)
                    $input += "" + i + ":1" + array[i] + "\n";
                else
                    $input += "" + i + ":0" + array[i] + "\n";
            }
            else {
                if (i <= x)
                    $input += "" + i + ":1" + array[i] + "\n";
                else
                    $input += "" + i + ":0" + array[i] + "\n";
            }
        }
    }
    return array[60];
 

}


function getOptions() {
    const fillDefaultHash = getDefaultFillHashInput()
    return Object.assign({}, options, {
        fillDefaultHash: options.fillDefaultHash ? fillDefaultHash : undefined
    })
}

function parseInput(value) {
    value = value.trim().replace(/'/gi, '"')
    try {
        return JSON.parse(value)
    } catch (err) {
        return value.split('\n')
            .map(function (line) { return line.trim() })
            .filter(function (line) { return line })
    }
}

function updateLeaveOptions(leaves) {

    leaves.forEach(function (leaf, i) {
        const el = document.createElement('option')
        el.value = `${i}`
        el.text = `#${i} - ${leaf}`
        // $leaveSelect.appendChild(el)   //1
        if (i === 60) {
            $passLeaf += leaf;      //---------------------------------------此处返回60的叶子
        }
    })
}

function jigeshuchu(leaves) {        //及格
    leaves.forEach(function (leaf, i) {
        if (i === 60) {
            return leaf;
        }
    })
}
// -------------------------------------
function updateProof(index) {
    setProof('')
    if (!tree) {
        return
    }
    const leaves = tree.getHexLeaves()
    if (!leaves.length) {
        return
    }
    const leaf = leaves[index]
    const proof = tree.getHexProof(leaf)
    setProof(JSON.stringify(proof, null, 2))
}


function updatepassProof() {
    setpassProof('')
    if (!tree) {
        return
    }
    const leaves = tree.getHexLeaves()
    if (!leaves.length) {
        return
    }
    const leaf = leaves[60]
    const proof = tree.getHexProof(leaf)
    setpassProof(JSON.stringify(proof, null, 2))
}







function setVerified(verified) {
    $verified = verified
}

function verify() {
    setVerified('-')
    const proof = getVerifyProof()
    const leaf = getVerifyLeaf()
    const root = getVerifyRoot()
    const hashFn = sha256     
    const options = getOptions()
    const verified = MerkleTree.verify(proof, leaf, root, hashFn, options)
    setVerified(`${verified}`)
    alert(verified)
}

function getDefaultFillHashInput() {
    return $fillDefaultHash //1
}

function getInputValue(value) {
    return $input.trim()  //1
}

function getVerifyProof() {
    console.log($verifyProof.value.trim())
    return parseInput($verifyProof.value.trim())
}

function getVerifyLeaf() {
    return $verifyLeaf.value.trim()
}

function getVerifyRoot() {
    return $verifyRoot.value.trim()
}

// setters

function setHashType(value) {
    if (!value) {
        return
    }
    // const $hash = document.querySelector(`input[name="hash"][value="${value}"]`)
    if (!$hash) {
        return
    }
    $hash.checked = true
}

function setInputValue(value, onlySave) {
    if (!onlySave) {
        $input.value = value
    }
    try {
        localStorage.setItem('input', value)
    } catch (err) {
        console.error(err)
    }
}

function setRootValue(value) {
    $root = value
}

function setLeavesValue(value) {
    $leaves = value
}

function setLayersValue(value) {
    $layers = value
}

function setFlatLayersValue(value) {
    $flatLayers = value
}

function setTreeValue(value) {
    $tree = value
}

function setHashValue(value) {
    try {
        localStorage.setItem('hash', value)
    } catch (err) {
        console.error(err)
    }
}

function setOptionValue(key, enabled, onlySave) {
    try {
        if (!onlySave) {
            // var $option = document.querySelector(`input[name="option"][id="${key}"]`)
            if ($option) {
                $option.checked = enabled
            }
        }
        options[key] = enabled
        localStorage.setItem('options', JSON.stringify(options))
        toggleFillDefaultHashView()
    } catch (err) {
        console.error(err)
    }
}

function setFillDefaultHash(value, onlySave) {
    if (!onlySave) {
        $fillDefaultHash.value = value
    }
    try {
        localStorage.setItem('fillDefaultHash', value)
    } catch (err) {
        console.error(err)
    }
}
//-------------------------------------------------------------------------------------
function setProof(value) {
    $proof = value
}

function setpassProof(value) {
    $passproof = value
}
// $verifyForm.addEventListener('submit', function (event) {
//     event.preventDefault()
//     verify()
// })
function setVerifyProof(value, onlySave) {
    if (!onlySave) {
        $verifyProof = value
    }
    try {
        localStorage.setItem('verifyProof', value)
    } catch (err) {
        console.error(err)
    }
}

function setVerifyLeaf(value, onlySave) {
    if (!onlySave) {
        $verifyLeaf = value
    }
    try {
        localStorage.setItem('verifyLeaf', value)
    } catch (err) {
        console.error(err)
    }
}

function setVerifyRoot(value, onlySave) {
    if (!onlySave) {
        $verifyRoot = value
    }
    try {
        localStorage.setItem('verifyRoot', value)
    } catch (err) {
        console.error(err)
    }
}

///////////////////这两个函数是给你用的
function shenqishuchuhanshu(score) {
    // document.getElementById("numb").value = score;
    const salt1 = compute(score);
    const leaves = tree.getHexLeaves()
    const leaf = leaves[60]
    const proof = tree.getHexProof(leaf)
    const hexRoot = tree.getHexRoot()
    var passdepository     //这个是存证，存下来，不给用户
    if (score >= 60) {
        passdepository = sha256("60:1" + salt1)
    }
    else
        passdepository = sha256("60:0" + salt1)

    const rec = {
        root: hexRoot,
        leaf: leaf,
        salt: salt1,
        proof: JSON.parse(JSON.stringify(proof, null, 2)),
        passdepository: passdepository
    }

    const proofs = JSON.parse(JSON.stringify(proof, null, 2));
    const res = { hexRoot, leaf, salt1, proofs, passdepository };
    // console.log(leaf)
    // console.log(proof)
    // console.log(passdepository)
    // console.log(hexRoot)
    // console.log(salt1)
    // console.log( sha256("60:1"))
    console.log(score)
    console.log(rec)
    alert(JSON.stringify(rec)) 
    return rec;
   
    };
      
    





function shenqiyanzhenghanshu(rec) {
    const options = getOptions()
    const proof = rec.proof
    const leaf = rec.leaf
    const root = rec.root
    const salt = rec.salt
    const hashFn = sha256
    const passdepository = rec.passdepository
    var very
    if (passdepository === sha256("60:1" + salt)) {
        very = MerkleTree.verify(proof, leaf, root, hashFn, options)
    }
    else very = false
    // console.log(very)
    return very
}
// const abc ={
//   root: '0x5c8831b593003641d45bff477a222528f5371f36e7338c092f52887d69f3e342',
//   leaf: '0xa207b2af86b22dbcb8b4344816f4158777495dc837c8dce0e94b5512ca2d5783',
//   salt: '130486768707808950000',
//   proof: ['0xa23d8e99629935d022a98120fc018f7ca650d44dba43ae73fdf4bb5e686737c4', '0x936ad45cfac13634dcb93196cc0c977c746ef892a01f20f3915ac16344657dea', '0x82347afff0793dd5fa3b796e7fa89bcdbb28e40845ae103782e28e4fe6335a15', '0x9c66ee9ca8d7f03ec401b461de4a5dc459fa06369eb516c40125adace2f4d2f6', '0x8f3eb76443e2ca586ce822fa7a65e91d532b0d959165053d1aa9804595bd8e8f', '0xc297747b403d41b5331b6bd65a48777996e283ee3c3cbc78ebcb4a713fee9bd8', '0xd5f22d221c0a0f18df0c52a94af7737222f040d950217ccd437fcb475efcff76'],
//   passdepository: '6487354f42936591dca92c170e7b15212a7b1dd54d2e66e26899936b3f5ebf38'
// }
// a= shenqishuchuhanshu(59)     //测试时使用的
// console.log(a)
// b= shenqiyanzhenghanshu(abc)
// console.log(b)
module.exports = { shenqishuchuhanshu, shenqiyanzhenghanshu }