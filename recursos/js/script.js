$('document').ready(function(){
    //Variáveis globais
    var indiceOng = -1
    var bdONGS = localStorage.getItem('bdONGS') //Carregar os Dados Guardados
    bdONGS = JSON.parse(bdONGS) //Transforma em objeto
    if(bdONGS == null){ //Caso estaja vazio o objeto, inicia um vetor vazio
        bdONGS = []
    }else{
        Listar()
    }
    
//Recebe o index da linha
$('a[href="deletar"], a[href="editar"], .ativo').on('click', function(){
    let selecao = $(this).parents("tr")
    indiceOng = parseInt(selecao.attr('alt'))
})
//Limpa todos os campos do cadastro
function Limpar(op){
    $('div .vazio').html('')
    $('#txtNome'+op).val('')
    $('#txtSlogan'+op).val('')
    $('#txtUrl'+op).val('')
    location.reload()
}

//Ações de colorir linha Ativa
    $('.ativo').on('change', function(){
        if($('tr[alt="'+indiceOng+'"] .ativo').is(':checked')){
            PoeCorLinha(indiceOng)
            Editar('on')
        }else{
            RemoveCorLinha(indiceOng)
            Editar()
        }
    })

    //Funções que alteram a cor da linha
    function PoeCorLinha(i){
        $('tr[alt="'+i+'"], tr[alt="'+i+'"] a').addClass('bg-success text-white')
    }
    function RemoveCorLinha(i){
        $('tr[alt="'+i+'"], tr[alt="'+i+'"] a').removeClass('bg-success text-white')
    }

    

//Ação para Adicionar
    $('#subCadastro').on('click', function(){
        if(Validar('')){
            Adicionar()
            Limpar('')
            alert('Mais uma Polinizadora para o Grupo')
            Listar()
        }
    })
    
    //Função de adicionar no array bdONGS
    function Adicionar(){
        let ong = JSON.stringify({
            nome: $('#txtNome').val(),
            slogan: $('#txtSlogan').val(),
            url: $('#txtUrl').val(),
            ativo: 'off'
        })
        bdONGS.push(ong)
        localStorage.setItem('bdONGS', JSON.stringify(bdONGS))
    }
    
//Ação para Editar
    $('a[href="editar"], .ativo').on('click', function(){
        let ong = JSON.parse(bdONGS[indiceOng])
        $('#txtNomeE').val(ong.nome)
        $('#txtSloganE').val(ong.slogan)
        $('#txtUrlE').val(ong.url)
    })

    $('#subEditar').on('click', function(){
        Editar()
        Limpar('E')
        Listar()
    })

    //Função para Editar
    function Editar(ligado = 'off'){ 
        bdONGS[indiceOng] = JSON.stringify({
            nome   : $("#txtNomeE").val() == '' ? bdONGS[indiceOng].nome : $("#txtNomeE").val(),
            slogan : $("#txtSloganE").val() == '' ? bdONGS[indiceOng].slogan : $("#txtSloganE").val(),
            url    : $("#txtUrlE").val() == '' ? bdONGS[indiceOng].url : $("#txtUrlE").val(),
            ativo  : ligado
        })
        localStorage.setItem("bdONGS", JSON.stringify(bdONGS))
        alert("Informações editadas.")
    }

//Ações para Deletar
    $('#subDeleta').on('click', function(){
        if($('#deleta').is(':checked')){
            Deletar()
        }else{
            alert('Tem certeza da sua decisão, então marque a caixa')
        }
    })

    //Função para deletar
    function Deletar(){
        bdONGS.splice(indiceOng,1)
        localStorage.setItem("bdONGS", JSON.stringify(bdONGS));
        indiceOng = -1
        $('#deleta').prop('unchecked')
        alert('Infelizmente perdemos uma polinizadora')
        Listar()
    }

//Funçao para Validação dos dados
    function Validar(op){
        if(($('#txtNome'+op).val() != '' && $('#txtSlogan'+op).val() != '' && $('#txtUrl'+op).val() != '')){
            for(var i in bdONGS){
                let ong = JSON.parse(bdONGS[i])
                if($('#txtNome'+op).val() == ong.nome){
                    alert('ONG já cadastrada')
                    return false
                }
            }
            return true
        }else{
            alert('Preencha todos os campos')
            return false
        }
    }

//Função usada para listar
    function Listar(){
        if(bdONGS.length != 0){
            $('#tbPrincipal').show()
            $('div .vazio').hide()
            
            $('#tbPrincipal').html("")
            $('#tbPrincipal').html(
                '<thead>'+
                '   <tr>'+
                '       <th scope="col" colspan="2" id="n" class="text-center">Nome</th>'+
                '       <th scope="col" colspan="3" id="s" class="text-center">Slogan</th>'+
                '       <th scope="col" colspan="2" id="l" class="text-center">Link Site</th>'+
                '       <th scope="col"  id="a" class="text-center">Ativo</th> '+
                '       <th scope="col" colspan="2" id="c" class="text-center">Configuração</th>'+
                '   </tr>'+
                '</thead>'+
                '<tbody>'+
                '</tbody>'
            )
            for(var i in bdONGS){
                let ong = JSON.parse(bdONGS[i])
                let col = ""
                let checkAtivo = ''
                let cssAtivo = ''

                if(ong.ativo == 'on'){
                    cssAtivo = 'class="bg-success text-white"'
                    checkAtivo = 'checked'
                }
    
                col+= '<tr scope="row"'+cssAtivo+'alt="'+i+'">'
                col+= '    <td colspan="2" header="n">'+ ong.nome +'</td>'
                col+= '    <td colspan="3" header="s">'+ ong.slogan +'</td>'
                col+= '    <td colspan="2" header="l">'+ ong.url +'</td>'
                col+= '    <td  header="a" class="text-center"><input title="Ong ativada/desativada" type="checkbox" class="ativo"'+checkAtivo+'> </td>'
                col+= '    <td colspan="2" header="c" class="text-center"><a style="color: black" href="editar" data-toggle="modal" data-target="#modalEdicao" '+cssAtivo+'>editar</a> | <a style="color: black" href="deletar" data-toggle="modal" data-target="#modalDeleta" '+cssAtivo+' >deletar</a></td>'
                col+= '</tr>'
    
                $('#tbPrincipal tbody').append(col)
            }
        }else{
            $('div .vazio').show()
            $('#tbPrincipal').hide()
        }
    }

})





