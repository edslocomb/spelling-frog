class PuzzlesController < ApplicationController
  def index
    render html: nil, layout: true
  end

  def show
    respond_to do |format|
      format.html do
        if params[:id].match?(/[a-z]{7}/)
          redirect_to(Puzzle.find_by(
            required_letter: params[:id].first,
            letters: params[:id].chars.sort.join
          ))
        elsif params[:id].to_i < 0
          redirect_to(Puzzle.order(id: :desc).limit(-params[:id]).last)
        elsif params[:id].to_i == 0
          redirect_to(Puzzle.latest)
        else
          render html: nil, layout: true
        end
      end
      format.json do
        puzzle = Puzzle.find(params[:id])
        render json: {
          id: puzzle.id,
          letters: puzzle.letters,
          requiredLetter: puzzle.required_letter,
          words: puzzle.words.map(&:name),
          maxScore: puzzle.score
        }
      end
    end
  end
end
