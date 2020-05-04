import React from 'react';
import Title from '../Title';
export default function Contact() {
    return (
        <section className="py-5">
            <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                    <Title title="contact us"/>
                    <form className="mt-5">
                        <div className="form-group">
                            <input type="text" name="firstName" className="form-control" placeholder="john smith"/>
                            <input type="email" name="email" className="form-control" placeholder="email@email.com"/>
                            <input type="text" name="subject" className="form-control" placeholder="important !!!"/>
                            <div className="form">
                                <textarea name="message" className="form-control" cols="30" rows="10" placeholder="message here"></textarea>
                            </div>
                            <div className="form-group mt-3">
                                <input type="submit" className="form-control btn-primary" value="send"/>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

            
        </section>
    )
}
