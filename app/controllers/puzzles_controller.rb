# frozen_string_literal: true

class PuzzlesController < ApplicationController
  def index
    render html: nil, layout: true
  end

  def show
    respond_to do |format|
      format.html { render html: nil, layout: true }
      format.json do
        puzzle =
          if params[:id].match?(/[a-z]{7}/)
            Puzzle.find_by(required_letter: params[:id].first,
                           letters: params[:id].chars.sort.join)
          elsif params[:id].to_i < 0
            Puzzle.order(id: :desc).limit(-params[:id]).last
          elsif params[:id].to_i == 0
            Puzzle.first
          else
            Puzzle.find(params[:id])
          end
        render json: {letters: puzzle.letters,
                      requiredLetter: puzzle.required_letter,
                      words: puzzle.words.map(&:name),
                      maxScore: puzzle.score}
      end
    end
  end
end
