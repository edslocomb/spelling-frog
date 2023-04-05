# frozen_string_literal: true

class PuzzlesController < ApplicationController
  def index
    render html: nil, layout: true
  end

  def show
    respond_to do |format|
      format.html { render html: nil, layout: true }
      format.json do
        puzzle = Puzzle.find(params[:id])
        render json: {letters: puzzle.letters,
                      requiredLetter: puzzle.required_letter,
                      words: puzzle.words.map(&:name)}
      end
    end
  end
end
