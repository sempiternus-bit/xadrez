$(function() {

	let initialpos = {

		a8: 'rook-black',
		b8: 'knight-black',
		c8: 'bishop-black',
		d8: 'queen-black',
		e8: 'king-black',
		f8: 'bishop-black',
		g8: 'knight-black',
		h8: 'rook-black',

		a7: 'pawn-black',
		b7: 'pawn-black',
		c7: 'pawn-black',
		d7: 'pawn-black',
		e7: 'pawn-black',
		f7: 'pawn-black',
		g7: 'pawn-black',
		h7: 'pawn-black',


		a2: 'pawn-white',
		b2: 'pawn-white',
		c2: 'pawn-white',
		d2: 'pawn-white',
		e2: 'pawn-white',
		f2: 'pawn-white',
		g2: 'pawn-white',
		h2: 'pawn-white',

		a1: 'rook-white',
		b1: 'knight-white',
		c1: 'bishop-white',
		d1: 'queen-white',
		e1: 'king-white',
		f1: 'bishop-white',
		g1: 'knight-white',
		h1: 'rook-white'

	}

	let colunas = {}
	colunas[0] = 'a'
	colunas[1] = 'b'
	colunas[2] = 'c'
	colunas[3] = 'd'
	colunas[4] = 'e'
	colunas[5] = 'f'
	colunas[6] = 'g'
	colunas[7] = 'h'

	let mate = false

	let movekings = {'black': {}, 'white': {}}
	let check = {}
	let checking = false
	let checklonge = false

	let player = 'white'
	let turn = 'white'

	let clicou = 0
	let choose = ''
	let housechoose = ''
	let go = ''

	$('body').on('click', '.piece', function() {
		
		let classe = $(this).attr('class');
		let casa = $(this).parent()
		let houseid = casa.attr('id');

		if(turn == player){

			if(classe.indexOf(player) >= 0){

				clicou = 1
				housechoose = houseid
				choose = $(this)
				$('.square-board').removeClass('possible')

				verifypieces(choose, houseid)

			}

		}

	})

	$('body').on('click', '.square-board', function(){

		let have = $(this).find('.piece')
		let houseid = $(this).attr('id')

		let movimentspossible = verifypieces(choose, housechoose)
		$.each(movimentspossible, function(i, sqr){

			$('#' + sqr).addClass('possible')

		})

		if(houseid != housechoose){

			go = houseid

			if(objSearch(movimentspossible, houseid) != null){

				if(mate == false){

					alert('ok')

				}else{

					alert('foi')

				}

				//engine(turn, checking)

			}else{



			}

		}

	})

	function verifypieces(piece, square){

		let tipo = piece.attr('class')
		let possiblemoves = {}

		if(tipo == 'piece pawn-black'){

			possiblemoves = findmovespawn(square, 'black')

		}else if(tipo == 'piece pawn-white'){

			possiblemoves = findmovespawn(square, 'white')

		}

		if(tipo.indexOf('bishop') >= 0){

			possiblemoves = findmovesbishop(square, tipo)

		}

		return possiblemoves

	}

	function findmovesbishop(squarebishop, bishoptype){

		if(bishoptype.indexOf('black') >= 0){

			let typeatk = 'white'

		}else{

			let typeatk = 'black'

		}

		let line = Number(squarebishop[1])
		let linha= line + 1
		let coluna = squarebishop[0]
		let x = 0
		let moves = {}
		let colunaatual = ''
		let coltopright = ''

		for(let i = 0; i <= 6; i++){

			if(colunaatual == ''){

				colunaatual = objSearch(colunas, coluna)
				coltopright = colunaatual++

			}

			if(objSearchIndex(colunas, coltopright) != null){

				if(colunas[coltopright] != coluna){


					let linetopright = linha++
					let casa = colunas[coltopright] + linetopright

					if($('#' + casa).length == 1){

						if($('#' + casa).find('piece').length == 1){

							let encontrada = $('#' + casa).find('piece').attr('class')

							if(encontrada.indexOf(typeatk) >= 0){

								x++
								moves[x] = casa
								break

							}else{

								break

							}

						}else{

							x++
							moves[x] = casa

						}

					}else{

						break

					}
				}

				coltopright++

			}

		}


		return moves

	}

	function findmovespawn(squarepawn, pawntype){

		let line = Number(squarepawn[1])
		let column = squarepawn[0]
		let linha = line + 1
		let moves = {}
		let x = 0

		let indicecolum = Number(objSearch(colunas, column))
		let prox = Number(indicecolum) + 1 
		let anterior = Number(indicecolum) - 1

		if(pawntype == 'white'){

			if(line == 2){

				for(let i = 0; i < 2; i++){

					let house = $('#' + column + (linha++))

					if(house.find('.piece').length == 0){

						x++
						moves[x] = house.attr('id')

					}else{

						break

					}

				}

			}else{

				for(let i = 0; i < 1; i++){

					let house = $('#' + column + (linha++))

					if(house.find('.piece').length == 0){

						x++
						moves[x] = house.attr('id')

					}else{

						break

					}

				}

			}

			let diagonalmovespawn = line + 1

			if(objSearchIndex(colunas, prox) != null){

				let proxcolum = colunas[prox] + diagonalmovespawn

				if($('#' + proxcolum).find('.piece').length == 1){

					let foundpiece = $('#' + proxcolum).find('.piece').attr('class')

					if(foundpiece.indexOf('black') > 0){

						x++
						moves[x] = proxcolum

					}

				}

			}

			if(objSearchIndex(colunas, anterior) != null){

				let proxcolum = colunas[anterior] + diagonalmovespawn

				if($('#' + proxcolum).find('.piece').length == 1){

					let foundpiece = $('#' + proxcolum).find('.piece').attr('class')

					if(foundpiece.indexOf('black') > 0){

						x++
						moves[x] = proxcolum

					}

				}

			}



		}else{

			//moves black


			if(line == 7){

				for(let i = 7; i >= 5; --i){

					if(i != 7){

						let house = $('#' + column + i)

						if(house.find('.piece').length == 0){

							x++
							moves[x] = house.attr('id')

						}else{

							break

						}

					}


				}

			}else{


				for(let i = line; i >= line- 1; --i){

					let house = $('#' + column + i)

					if(house.find('.piece').length == 0){

						x++
						moves[x] = house.attr('id')

					}else{

						break

					}

				}

			}

			let diagonalmovespawn = line - 1

			if(objSearchIndex(colunas, prox) != null){

				let proxcolum = colunas[prox] + diagonalmovespawn

				if($('#' + proxcolum).find('.piece').length == 1){

					let foundpiece = $('#' + proxcolum).find('.piece').attr('class')

					if(foundpiece.indexOf('white') > 0){

						x++
						moves[x] = proxcolum

					}

				}

			}

			if(objSearchIndex(colunas, anterior) != null){

				let proxcolum = colunas[anterior] + diagonalmovespawn

				if($('#' + proxcolum).find('.piece').length == 1){

					let foundpiece = $('#' + proxcolum).find('.piece').attr('class')

					if(foundpiece.indexOf('white') > 0){

						x++
						moves[x] = proxcolum

					}

				}

			}

			//end moves black

		}

		return moves

	}

	function newgame(){

		$('.square-board').each(function(){

			let square = $(this)
			let sq = square.attr('id')

			if(objSearchIndex(initialpos, sq) != null){

				$(this).html('<div class="piece '+initialpos[sq]+'"></div>')

			}

		})

	}

	function printBoard(){

		let light = 1
		let colums = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

		for(let i = 8; i >= 1; i--){

			for(let c = 0; c < colums.length; ++c){

				let sq = colums[c] + i
				let lightdark = (light == 1) ? 'light' : 'dark'

				$('.board').append('<div class="square-board '+lightdark+'" id="'+sq+'"></div>')
				light ^= 1

			}

			light ^= 1

		}

	}

	function objSearch(obj, valor){

		let retorno = null
		$.each(obj, function(i, val){

			if(val == valor){

				retorno = i

			}


		})

		return retorno

	}

	function objSearchIndex(obj, index){

		let retorno = null
		$.each(obj, function(i, val){

			if(i == index){

				retorno = i

			}


		})

		return retorno

	}

	printBoard()
	newgame()

})