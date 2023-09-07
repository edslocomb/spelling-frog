class PuzzlesController < ApplicationController
  def index
    render html: nil, layout: true
  end

  def show
    respond_to do |format|
      format.html do
        puzzle = Puzzle.for_id(params[:id])
        return redirect_to(puzzle) if puzzle && puzzle.id != params[:id].to_i
        render html: nil, layout: true
      end
      format.json do
        puzzle = Puzzle.for_id(params[:id])
        return render json: {error: "Not found", id: params[:id]} unless puzzle
        render json: {
          id: puzzle.id,
          letters: puzzle.letters,
          requiredLetter: puzzle.required_letter,
          words: puzzle.words.map(&:name),
          maxScore: puzzle.score,
          published: puzzle.published_at.to_i
        }
      end
    end
  end
end
